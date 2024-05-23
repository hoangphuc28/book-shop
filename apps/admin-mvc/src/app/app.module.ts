import { Module } from '@nestjs/common';
import { CoreModule } from '@book-shop/libs';
import { BooksModule } from './books/books.module';
import { CouponsModule } from './coupons/coupons.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
@Module({
  imports: [
    CoreModule,
    BooksModule,
    CouponsModule,
    CategoriesModule,
    OrdersModule,
    PaymentsModule,
  ],
})
export class AppModule {}
