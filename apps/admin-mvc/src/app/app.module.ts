import { Module } from '@nestjs/common';
import { CoreModule, ProviderModule } from '@book-shop/libs';
import { BooksModule } from './books/books.module';
import { CouponsModule } from './coupons/coupons.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { JWTModule } from '../jwt/jwt.module';
@Module({
  imports: [
    //guard
    JWTModule,
    //database
    ProviderModule,
    AuthModule,
    CoreModule,
    BooksModule,
    CouponsModule,
    CategoriesModule,
    OrdersModule,
    PaymentsModule,
    AdminModule,
  ],
})
export class AppModule {}
