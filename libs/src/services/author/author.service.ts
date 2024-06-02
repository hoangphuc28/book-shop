import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../../common';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private categoryRepo: Repository<Author>,
    private configService: ConfigService
  ) { }
  async find(includeIsActive: boolean) {
    const whereCondition: any = {}
    if (includeIsActive) {
      whereCondition.isActive = true;
    }
    return this.categoryRepo.find({where: whereCondition})
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
