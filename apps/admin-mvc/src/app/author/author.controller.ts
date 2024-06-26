import { Body, Controller, Get, Post, Put, Query, Render, Res, UseGuards } from '@nestjs/common';
import { Authentication } from '../../guards/authentication.guard';
import { AuthorInputDto, AuthorService } from '@book-shop/libs';
import {Response} from 'express'

@UseGuards(Authentication)

@Controller('authors')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  @Render('authors/index')
  async list(@Res() res: Response,
  @Query('page') page = 1,
  @Query('limit') limit = 10,
  @Query('search') search = '',
  ) {
    try {
      const res = await this.authorService.find(false, page, limit, search);
      return {data: res}
    } catch (error) {
      console.error('Error occurred while fetching books:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  @Get('create')
  @Render('authors/create')
  async createForm() {
    return {};
  }

  @Post()
  async create(
    @Body() author: AuthorInputDto,
    @Res() res: Response
  ) {
    try {
      this.authorService.save(author.name, (author.isActive === 'true'))
      return res.redirect('/authors');
    } catch (error) {
      console.error('Error occurred while saving book:', error);
      return res.redirect('/error');
    }
  }

  @Get('edit')
  @Render('authors/edit')
  async editForm(@Query('id') id: string) {
    const category = await this.authorService.findById(id);
    return { item: category };
  }

  @Put()
  async update(
    @Query('id') id: string,
    @Body() author: AuthorInputDto,
  ) {
    try {
      this.authorService.save(author.name, (author.isActive === 'true'), id)
    } catch (error) {
      console.error('Error occurred while saving book:', error);
      throw Error();
    }
  }
}
