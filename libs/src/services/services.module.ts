import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Author, Book, Cart, CartItem, Category, Promotion } from '../common';
import { AccountService } from './account/account.service';
import { BookService } from './book/book.service';
import { CategoryService } from './category/category.service';
import { ResourceService } from './resource/resource.service';
import { AwsModule } from '../core/aws/aws.module';
import { AuthorService } from './author/author.service';
import { CartService } from './cart/cart.service';
import { PromotionService } from './promotion/promotion.service';

@Module({
  imports: [
    AwsModule,
    TypeOrmModule.forFeature([Account, Book, Category, Author, Cart, CartItem, Promotion]),
  ],
  providers: [
    AccountService,
    BookService,
    CategoryService,
    ResourceService,
    ResourceService,
    AuthorService,
    CartService,
    PromotionService,
  ],
  exports: [
    AccountService,
    BookService,
    CategoryService,
    AuthorService,
    CartService,
    PromotionService
  ],
})
export class ServicesModule {}
