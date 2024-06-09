import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author, PaginationResultDto } from '../../common';
import { Like, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private categoryRepo: Repository<Author>,
  ) { }
  async find(includeIsActive: boolean, page?: number, limit?: number, query = ''): Promise<PaginationResultDto<Author>> {
    const queryBuilder = this.categoryRepo.createQueryBuilder('author');
    if (includeIsActive) {
        queryBuilder.andWhere('author.isActive = :isActive', { isActive: true });
    }
    if (query) {
        queryBuilder.andWhere('LOWER(author.name) LIKE LOWER(:name)', { name: `%${query}%` });
    }
    if (page !== undefined && limit !== undefined) {
      const offset = (page - 1) * limit;
      queryBuilder.offset(offset).limit(limit);
  }
  queryBuilder.orderBy('author.createdAt', 'ASC');

    // Get the results and total count
    const [authors, total] = await queryBuilder.getManyAndCount();

    return new PaginationResultDto(authors, total, page, limit);
}

  async findById(id: string){
    return this.categoryRepo.findOne({where: {id: id}})
  }
  async save(name: string, isActive: boolean, id?: string) {
    try {
      let author: Author | null
      if(id) {
        author = await this.categoryRepo.findOne({where: {id: id}})
        if (!author) {
          throw new BadRequestException('Author not found');
        }
        author.name = name
        author.isActive = isActive
      } else {
        author = new Author({name, isActive})
      }
      this.categoryRepo.save(author)
    } catch (error) {
      console.error(error);
      throw new BadRequestException(id ? 'Cannot update author' : 'Cannot create author');
    }
  }
}
