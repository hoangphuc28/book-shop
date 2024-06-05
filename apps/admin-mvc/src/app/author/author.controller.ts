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
  async list(@Res() res: Response
  ) {
    try {
      const authors = await this.authorService.find(false);
      return {data: authors}
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
      console.log(author)
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
      console.log(id)
      this.authorService.save(author.name, (author.isActive === 'true'), id)
    } catch (error) {
      console.error('Error occurred while saving book:', error);
      throw Error();
    }
  }
}
