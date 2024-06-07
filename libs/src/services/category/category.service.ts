import { BadRequestException, Injectable } from '@nestjs/common';
import { Category, PaginationResultDto } from '../../common';
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

  async find(includeIsActive: boolean, page?: number, limit?: number, query = ''): Promise<PaginationResultDto<Category>> {
    const queryBuilder = this.categoryRepo.createQueryBuilder('category');

    // Apply isActive filter if needed
    if (includeIsActive) {
        queryBuilder.andWhere('category.isActive = :isActive', { isActive: true });
    }

    // Apply name search query if provided
    if (query) {
        queryBuilder.andWhere('LOWER(category.name) LIKE LOWER(:name)', { name: `%${query}%` });
    }

    // Apply pagination if both page and limit are provided
    if (page !== undefined && limit !== undefined) {
        const offset = (page - 1) * limit;
        queryBuilder.offset(offset).limit(limit);
    }

    // Get the results and total count
    const [categories, total] = await queryBuilder.getManyAndCount();

    return new PaginationResultDto(categories, total, page, limit);
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
