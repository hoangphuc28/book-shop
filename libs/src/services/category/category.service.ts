import { Injectable } from '@nestjs/common';
import { Category } from '../../common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    private configService: ConfigService
  ) { }
  async find() {
    return this.categoryRepo.find()
  }
  async findById(id: string){
    return this.categoryRepo.findOne({where: {categoryID: id}})
  }
}
