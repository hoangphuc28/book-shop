import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AboutModule } from './about/about.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import {CoreModule, ProviderModule} from '@book-shop/libs'
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
@Module({
  imports: [
    ProviderModule,
    CoreModule,
    BooksModule,
    AboutModule,
    OrderModule,
    CartModule,
    AuthModule,
    AccountModule,
  ],
})
export class AppModule {}
