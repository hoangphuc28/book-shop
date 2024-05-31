import { Book } from '../../common/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookSearchCondition, BooksPagination } from '../../common';
import { Repository } from 'typeorm';
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
  async find(limit: number, page: number, includeInactive = false, condition?: BookSearchCondition): Promise<BooksPagination> {
    const result = new BooksPagination();
    const offset = limit * page - limit || 0;
    const whereCondition: any = { category: { categoryID: condition?.category } };

    if (!includeInactive) {
      whereCondition.isActive = true;
    }

    const [items, totalCount] = await this.bookRepository.findAndCount({
      take: limit,
      skip: offset,
      where: whereCondition,
    });

    const bucketName = this.configService.get<string>('AWS.SERVICES.S3.BUCKET_NAME');

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
    const book = await this.bookRepository.findOne({ where: { id: id } })
    const bucketName = this.configService.get<string>('AWS.SERVICES.S3.BUCKET_NAME');
    if (book) {
      book.thumbnail = `https://${bucketName}.s3.amazonaws.com/products/${book?.id}.jpeg`

    }
    return book
  }
  async save(
    title: string,
    description: string,
    price: number,
    author: string,
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
        book.author = author;
        book.categoryId = categoryId;
        book.publishDate = publishDate;
        book.isActive = isActive;
      } else {
        // Create a new book
        book = new Book({
          title,
          description,
          price,
          author,
          categoryId,
          publishDate,
          isActive
        });
      }
      console.log(book)
      const savedBook = await this.bookRepository.save(book);

      if (thumbnail) {
        await this.resourceService.upload(thumbnail, savedBook.id, 'products');
      }

      return {
        message: id ? 'Book is updated successfully' : 'Book is created successfully',
        status: 201
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(id ? 'Cannot update book' : 'Cannot create book');
    }
  }
  // async save(
  //   title: string,
  //   description: string,
  //   price: number,
  //   author: string,
  //   categoryId: string,
  //   publishDate: Date,
  //   isActive: boolean,
  //   thumbnail: Express.Multer.File,
  //   id?: string
  // ) {
  //   try {
  //     const res = await this.bookRepository.save(
  //       new Book({
  //         title,
  //         description,
  //         price,
  //         author,
  //         categoryId,
  //         isActive,
  //         publishDate,
  //       })
  //     );
  //     if (thumbnail !== undefined) {
  //       await this.resourceService.upload(thumbnail, res.id, 'products')

  //     }
  //     return {
  //       message: "Book is created successfully",
  //       sataus: 201
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new BadRequestException('Can not create book');
  //   }
  // }
}
