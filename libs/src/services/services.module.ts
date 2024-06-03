import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Author, Book, Cart, CartItem, Category } from '../common';
import { AccountService } from './account/account.service';
import { BookService } from './book/book.service';
import { CategoryService } from './category/category.service';
import { ResourceService } from './resource/resource.service';
import { AwsModule } from '../core/aws/aws.module';
import { AuthorService } from './author/author.service';
import { CartService } from './cart/cart.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    AwsModule,
    TypeOrmModule.forFeature([Account, Book, Category, Author, Cart, CartItem]),
  ],
  providers: [
    AccountService,
    BookService,
    CategoryService,
    ResourceService,
    ResourceService,
    AuthorService,
    CartService,
  ],
  exports: [AccountService, BookService, CategoryService, AuthorService, CartService],
})
export class ServicesModule {}
