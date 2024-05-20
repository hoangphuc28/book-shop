import { Module } from '@nestjs/common';
import {CoreModule} from '@book-shop/libs'
import { BooksModule } from './books/books.module';
import { AboutModule } from './about/about.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
@Module({
  imports: [CoreModule, BooksModule, AboutModule, UserModule, OrderModule, CartModule]
})
export class AppModule {}
