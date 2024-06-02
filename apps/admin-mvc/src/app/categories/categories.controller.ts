import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';


import { BookInputDto, CategoryInputDto, CategoryService } from '@book-shop/libs';
import { Authentication } from '../../guards/authentication.guard';
@UseGuards(Authentication)

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoryService) {}


  @Get()
  @Render('categories/index')
  async listBooks(@Res() res: Response
  ) {
    try {
      const categories = await this.categoriesService.find(false);
      return {data: categories}
    } catch (error) {
      console.error('Error occurred while fetching books:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  @Get('create')
  @Render('categories/create')
  async createForm() {
    return {};
  }
  @Post()
  async create(
    @Body() category: CategoryInputDto,
    @Res() res: Response
  ) {
    try {
      this.categoriesService.save(category.name, (category.isActive === 'true'))
      return res.redirect('/categories');
    } catch (error) {
      console.error('Error occurred while saving book:', error);
      return res.redirect('/error');
    }
  }
  @Get('edit')
  @Render('categories/edit')
  async editForm(@Query('id') id: string) {
    const category = await this.categoriesService.findById(id);
    return { item: category };
  }

  @Put()
  async update(
    @Query('id') id: string,
    @Body() category: CategoryInputDto,
  ) {
    try {
      console.log(category)
      this.categoriesService.save(category.name, (category.isActive === 'true'), id)
    } catch (error) {
      console.error('Error occurred while saving book:', error);
      throw Error();
    }
  }

}
