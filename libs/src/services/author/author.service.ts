import { Injectable } from '@nestjs/common';
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
  async find() {
    return this.categoryRepo.find()
  }
  async findById(id: string){
    return this.categoryRepo.findOne({where: {id: id}})
  }
}
