import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Author, Book, Category } from '../common';
import { AccountService } from './account/account.service';
import { BookService } from './book/book.service';
import { CategoryService } from './category/category.service';
import { ResourceService } from './resource/resource.service';
import { AwsModule } from '../core/aws/aws.module';
import { AuthorService } from './author/author.service';

@Module({
  imports: [AwsModule, TypeOrmModule.forFeature([Account, Book, Category, Author])],
  providers: [
    AccountService,
    BookService,
    CategoryService,
    ResourceService,
    ResourceService,
    AuthorService,
  ],
  exports: [AccountService, BookService, CategoryService, AuthorService],
})
export class ServicesModule {}
