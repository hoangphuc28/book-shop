import { BadRequestException, Injectable } from '@nestjs/common';
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

  async find(includeIsActive: boolean) {
    const whereCondition: any = {}
    if (includeIsActive) {
      whereCondition.isActive = true;
    }
    return this.categoryRepo.find({where: whereCondition})
  }
  async findById(id: string){
    return this.categoryRepo.findOne({where: {categoryID: id}})
  }

  async save(name: string, isActive: boolean, id?: string) {
    try {
      let category: Category | null
      if(id) {
        category = await this.categoryRepo.findOne({where: {categoryID: id}})
        if (!category) {
          throw new BadRequestException('Category not found');
        }
        category.name = name
        category.isActive = isActive
      } else {
        category = new Category({name, isActive})
      }
      this.categoryRepo.save(category)
    } catch (error) {
      console.error(error);
      throw new BadRequestException(id ? 'Cannot update categort' : 'Cannot create category');
    }
  }
}
