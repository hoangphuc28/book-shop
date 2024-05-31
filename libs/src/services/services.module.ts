import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Book, Category } from '../common';
import { AccountService } from './account/account.service';
import { BookService } from './book/book.service';
import { CategoryService } from './category/category.service';
import { ResourceService } from './resource/resource.service';
import { AwsModule } from '../core/aws/aws.module';

@Module({
  imports: [AwsModule, TypeOrmModule.forFeature([Account, Book, Category])],
  providers: [AccountService, BookService, CategoryService, ResourceService, ResourceService],
  exports: [AccountService, BookService, CategoryService],
})
export class ServicesModule {}
