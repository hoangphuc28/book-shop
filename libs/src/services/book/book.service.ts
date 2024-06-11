import { Book, OrderItem } from '../../common/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookSearchCondition, BooksPagination } from '../../common';
import { Like, MoreThan, Repository, SelectQueryBuilder } from 'typeorm';
import { ResourceService } from '../resource/resource.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private resourceService: ResourceService,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,

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
  async findAll(search?: string) {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');

    queryBuilder.where('book.isActive = :isActive', { isActive: true });

    if (search) {
      const searchTerm = search.toLowerCase();
      queryBuilder.andWhere('LOWER(book.title) LIKE :search', { search: `%${searchTerm}%` });
    }

    return queryBuilder.getMany();
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
      .leftJoinAndSelect('book.author', 'author');
    queryBuilder = await this.queryBuilderCondition(
      queryBuilder,
      condition,
      includeIsActive
    );
    if (condition?.sort) {
      queryBuilder = await this.sortBy(queryBuilder, condition?.sort);
    }
    queryBuilder.orderBy('book.createdAt', 'ASC');

    const [items, totalCount] = await queryBuilder
      .take(limit)
      .skip(offset)
      .getManyAndCount();
    result.items = items;
    result.currentPage = page;
    result.itemsPerPage = limit;
    result.totalItem = totalCount;
    result.totalPage = Math.ceil(result.totalItem / limit);
    return result;
  }
  async findById(id: string) {
    const book = await this.bookRepository.createQueryBuilder('book')
      .leftJoinAndSelect('book.category', 'category')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.reviews', 'review', 'review.isActive = :isActive', { isActive: true })
      .where('book.id = :id', { id })
      .getOne();

    if (!book) {
      throw new Error('Can not find book');
    }

    return book;
  }
  async calculateRating(productId: string) {
    const product = await this.findById(productId);
    if (!product) {
        throw new Error('Can not find product');
    }

    let total = 0;
    const reviews = product.reviews || [];  // Đảm bảo reviews là một mảng hợp lệ
    const length = reviews.length;
    if (length === 0) {
        await this.bookRepository.save({ id: product.id, rating: 0 })
        return
    }

    for (let i = 0; i < length; i++) {
        const rating = reviews[i].rating;
        if (typeof rating === 'number' && !isNaN(rating)) {
            total += rating;
        } else {
            throw new Error(`Invalid rating value at index ${i}`);
        }
    }

    const averageRating = total / length;
    product.rating = Math.round(averageRating);

    await this.bookRepository.save({ id: product.id, rating: product.rating })

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
    id?: string,
    salePrice?: number
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
        if (salePrice)
          book.salePrice = salePrice;
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
        const thumbnailUrl = await this.resourceService.upload(
          thumbnail,
          savedBook.id,
          'products'
        );
        book.thumbnail = thumbnailUrl;
        await this.bookRepository.save(book);
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
  async queryBuilderCondition(
    queryBuilder: any,
    condition?: BookSearchCondition,
    includeIsActive?: boolean
  ): Promise<SelectQueryBuilder<Book>> {
    const categoryCondition = condition?.category || [];
    const authorCondition = condition?.author || [];
    if (condition?.query) {
      const trimmedQuery = (condition?.query || '').trim();
      queryBuilder = queryBuilder.where(
        'LOWER(book.title) LIKE LOWER(:query)',
        { query: `%${trimmedQuery}%` }
      );
    }
    if (condition?.rating) {
      queryBuilder = queryBuilder.where('book.rating = :rating', {
        rating: parseInt(condition?.rating),
      });
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
    return queryBuilder;
  }
  async sortBy(
    queryBuilder: SelectQueryBuilder<Book>,
    sort: string
  ): Promise<SelectQueryBuilder<Book>> {
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
    return queryBuilder;
  }
  async updateSalePrice(id: string, value: number) {
    const book = await this.bookRepository.findOne({
      where: { id: id }
    });
    if (!book) {
      throw new Error('Can not find book')
    }
    book.salePrice = value
    await this.bookRepository.save(book)
  }
  async getBooksOneSale() {
    return this.bookRepository.find({
         relations: [
        'category',
        'author',
        'reviews.accounts',
      ],
      order: {
        createdAt: 'DESC',
      },
      take: 8,
    });
  }
  async getBooksWithCondition(condition: number, limit: number) {
    switch (condition) {
      case 1: {
        return this.bookRepository.find({
          relations: [
            'category',
            'author',
            'reviews'
          ],
          order: {
            rating: 'DESC',
          },
          take: limit,
        });
      }
      case 2: {
        const query = this.orderItemRepository.createQueryBuilder('orderItem')
          .select('orderItem.bookId', 'bookId')
          .groupBy('orderItem.bookId')
          .addSelect('SUM(orderItem.quantity)', 'total') // Thay COUNT bằng SUM để tính tổng số lượng mua
          .orderBy('total', 'DESC') // Sắp xếp theo tổng số lượng giảm dần
          .limit(limit);
        const result = await query.getRawMany();
        return result.map(item => this.findById(item.bookId));
      }
    }
  }
}
