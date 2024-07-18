import { Module } from '@nestjs/common';
import { CoreModule, ProviderModule } from '@book-shop/libs';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { JWTModule } from '../jwt/jwt.module';
import { AuthorModule } from './author/author.module';
import { PromotionModule } from './promotion/promotion.module';
import { AccountModule } from './account/account.module';
import { AboutModule } from './about/about.module';
import { ReviewsModule } from './reviews/reviews.module';
@Module({
  imports: [
    //guard
    JWTModule,
    //database
    ProviderModule,
    AuthModule,
    CoreModule,
    BooksModule,
    CategoriesModule,
    OrdersModule,
    AdminModule,
    AuthorModule,
    PromotionModule,
    AccountModule,
    AboutModule,
    ReviewsModule,
  ],
})
export class AppModule {}
