import { Book } from '../../common/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookSearchCondition, BooksPagination } from '../../common';
import { In, Like, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private configService: ConfigService
  ) { }
  async find( limit: number, page: number, condition: BookSearchCondition) {
    const offset = limit * page - limit || 0
    if (limit === 0) {
      return this.bookRepository.find()
    }
    const result = new BooksPagination()
     const items = await this.bookRepository.find({
      take: limit,
      skip: offset,
      where: {category: {categoryID: condition.category}, isActive: true},
    });
    const bucketName = this.configService.get<string>('AWS.SERVICES.S3.BUCKET_NAME')

    result.items = items.map((book) => {
      return {
        ...book,
        thumbnail: `https://${bucketName}.s3.amazonaws.com/products/${book?.id}.jpeg`
      }
    })
    result.currentPage = page
    result.itemsPerPage = limit
    result.totalItem = items.length
    result.totalPage =  Math.ceil(result.totalItem / limit);
    return result
  }
}
