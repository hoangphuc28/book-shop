import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Account,
  Author,
  Book,
  Cart,
  CartItem,
  Category,
  Order,
  OrderItem,
  Promotion,
  Review,
  AboutPage
} from '../common';
import { AccountService } from './account/account.service';
import { BookService } from './book/book.service';
import { CategoryService } from './category/category.service';
import { ResourceService } from './resource/resource.service';
import { AwsModule } from '../core/aws/aws.module';
import { AuthorService } from './author/author.service';
import { CartService } from './cart/cart.service';
import { PromotionService } from './promotion/promotion.service';
import { OrdersService } from './orders/orders.service';
import { ReviewService } from './review/review.service';
import { AboutService } from './about/about.service';

@Module({
  imports: [
    AwsModule,
    TypeOrmModule.forFeature([
      Account,
      Book,
      Category,
      Author,
      Cart,
      CartItem,
      Promotion,
      Order,
      OrderItem,
      Review,
      AboutPage
    ]),
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
    OrdersService,
    ReviewService,
    AboutService,
  ],
  exports: [
    AccountService,
    BookService,
    CategoryService,
    AuthorService,
    CartService,
    PromotionService,
    OrdersService,
    ReviewService,
    AboutService
  ],
})
export class ServicesModule {}
