import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AboutModule } from './about/about.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { CoreModule, ProviderModule } from '@book-shop/libs';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ResourceModule } from './resource/resource.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { PromotionModule } from './promotion/promotion.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join('schema.gql'),
    }),
    //database
    ProviderModule,

    CoreModule,
    BooksModule,
    AboutModule,
    OrderModule,
    CartModule,
    AuthModule,
    AccountModule,
    ResourceModule,
    CategoryModule,
    AuthorModule,
    PromotionModule,
  ],
})
export class AppModule {}
