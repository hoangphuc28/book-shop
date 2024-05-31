import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Render,
  UseInterceptors,
  UploadedFile,
  UsePipes,
  ValidationPipe,
  Res,
  Query,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { BookService, CategoryService, BookInputDto } from '@book-shop/libs';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BookService,
    private categoryService: CategoryService
  ) {}

  @Get()
  @Render('books/index')
  async findAll() {
    return;
  }
  @Get('api/books')
  async findBooks(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Res() res: Response
  ) {
    try {
      const booksPagination = await this.booksService.find(limit, page, true);
      return res.json(booksPagination);
    } catch (error) {
      console.error('Error occurred while fetching books:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  @Get('create')
  @Render('books/create')
  async createForm() {
    const categories = await this.categoryService.find();
    return { categories, errors: {}, formData: {} };
  }

  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() bookInput: BookInputDto,
    @UploadedFile() thumbnail: Express.Multer.File,
    @Res() res: Response
  ) {
    try {
      const {
        title,
        description,
        price,
        author,
        categoryId,
        publishDate,
        isActive,
      } = bookInput;

      await this.booksService.save(
        title,
        description,
        price,
        author,
        categoryId,
        publishDate,
        (isActive === 'true'),
        thumbnail
      );
      return res.redirect('/books');
    } catch (error) {
      console.error('Error occurred while saving book:', error);
      return res.redirect('/error');
    }
  }

  @Get('edit')
  @Render('books/edit')
  async editForm(@Query('id') id: string) {
    const categories = await this.categoryService.find();
    const book = await this.booksService.findById(id);
    return { book, categories };
  }

  @Put()
  @UseInterceptors(FileInterceptor('thumbnail'))
  async updateBook(
    @Query('id') id: string,
    @Body() bookInput: BookInputDto,
    @UploadedFile() thumbnail: Express.Multer.File
  ) {
    try {
      const {
        title,
        description,
        price,
        author,
        categoryId,
        publishDate,
        isActive,
      } = bookInput;
        return await this.booksService.save(
          title,
          description,
          price,
          author,
          categoryId,
          publishDate,
          (isActive === 'true'),
          thumbnail,
          id
        );
    } catch (error) {
      console.error('Error occurred while saving book:', error);
      throw Error();
    }
  }
}
