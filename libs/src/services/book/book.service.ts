import { Book } from '../../common/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookSearchCondition, BooksPagination } from '../../common';
import { Like, Repository, SelectQueryBuilder } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ResourceService } from '../resource/resource.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private configService: ConfigService,
    private resourceService: ResourceService
  ) { }
  async findBooksByCategories(categories: string[]): Promise<Book[]> {
    return this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.category', 'category') // Kết hợp bảng category vào truy vấn
      .where('category.categoryID IN (:...categoriesId)', {
        categoriesId: categories,
      })
      .getMany();
  }

  async find(
    limit: number,
    page: number,
    includeIsActive = true,
    condition?: BookSearchCondition
  ): Promise<BooksPagination> {
    const result = new BooksPagination();
    const offset = limit * page - limit || 0;

    let queryBuilder = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.category', 'category')
      .leftJoinAndSelect('book.author', 'author')
    queryBuilder = await this.queryBuilderCondition(queryBuilder, condition, includeIsActive)
    if(condition?.sort) {
    queryBuilder = await this.sortBy(queryBuilder, condition?.sort)
    }
    const [items, totalCount] = await queryBuilder
      .take(limit)
      .skip(offset)
      .getManyAndCount();

    const bucketName = this.configService.get<string>(
      'AWS.SERVICES.S3.BUCKET_NAME'
    );
    result.items = items.map((book) => {
      return {
        ...book,
        thumbnail: `https://${bucketName}.s3.amazonaws.com/products/${book?.id}.jpeg`,
      };
    });
    result.currentPage = page;
    result.itemsPerPage = limit;
    result.totalItem = totalCount;
    result.totalPage = Math.ceil(result.totalItem / limit);
    return result;
  }
  async findById(id: string) {
    const book = await this.bookRepository.findOne({ where: { id: id } });
    const bucketName = this.configService.get<string>(
      'AWS.SERVICES.S3.BUCKET_NAME'
    );
    if (book) {
      book.thumbnail = `https://${bucketName}.s3.amazonaws.com/products/${book?.id}.jpeg`;
    }
    return book;
  }
  async save(
    title: string,
    description: string,
    price: number,
    authorId: string,
    categoryId: string,
    publishDate: Date,
    isActive: boolean,
    thumbnail: Express.Multer.File,
    id?: string
  ) {
    try {
      let book: Book | null;
      if (id) {
        book = await this.bookRepository.findOne({ where: { id: id } });
        if (!book) {
          throw new BadRequestException('Book not found');
        }
        // Update the existing book
        book.title = title;
        book.description = description;
        book.price = price;
        book.authorId = authorId;
        book.categoryId = categoryId;
        book.publishDate = publishDate;
        book.isActive = isActive;
      } else {
        // Create a new book
        book = new Book({
          title,
          description,
          price,
          authorId,
          categoryId,
          publishDate,
          isActive,
        });
      }
      const savedBook = await this.bookRepository.save(book);

      if (thumbnail) {
        await this.resourceService.upload(thumbnail, savedBook.id, 'products');
      }

      return {
        message: id
          ? 'Book is updated successfully'
          : 'Book is created successfully',
        status: 201,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        id ? 'Cannot update book' : 'Cannot create book'
      );
    }
  }
  async queryBuilderCondition(queryBuilder: any, condition?: BookSearchCondition, includeIsActive?: boolean): Promise<SelectQueryBuilder<Book>> {
    const categoryCondition = condition?.category || [];
    const authorCondition = condition?.author || [];
    if (condition?.query) {
      const trimmedQuery = (condition?.query || '').trim();
      queryBuilder = queryBuilder.where('LOWER(book.title) LIKE LOWER(:query)', { query: `%${trimmedQuery}%` });
    }
    if (condition?.rating) {
      console.log(condition.rating)
      console.log(condition?.query)
      queryBuilder = queryBuilder.where('book.rating = :rating', { rating: parseInt(condition?.rating) });
    }
    if (categoryCondition.length > 0) {
      queryBuilder = queryBuilder.andWhere(
        'category.categoryID IN (:...categoriesId)',
        { categoriesId: categoryCondition }
      );
    }
    if (authorCondition.length > 0) {
      queryBuilder = queryBuilder.andWhere('author.id IN (:...authorIds)', {
        authorIds: authorCondition,
      });
    }
    if (includeIsActive) {
      queryBuilder = queryBuilder
        .andWhere('book.isActive = :isActive', { isActive: true })
        .andWhere('category.isActive = :isActive', { isActive: true });
    }
    return queryBuilder
  }
  async sortBy(queryBuilder: SelectQueryBuilder<Book>, sort: string): Promise<SelectQueryBuilder<Book>>{
    switch (parseInt(sort)) {
      case 1:
        queryBuilder = queryBuilder.orderBy('book.price', 'ASC');
        break;
      case 2:
        queryBuilder = queryBuilder.orderBy('book.price', 'DESC');
        break;
      case 3:
        queryBuilder = queryBuilder.orderBy('book.rating', 'DESC');
        break;
      default:
        queryBuilder = queryBuilder.orderBy('book.createdAt', 'DESC'); // Default sorting by creation date
        break;
    }
    return queryBuilder

  }
}
