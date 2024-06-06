import { ServicesModule } from '@book-shop/libs';
import { Module } from '@nestjs/common';
import { BookResolver } from './book.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ServicesModule, JwtModule.register({})],
  providers: [BookResolver],
})
export class BooksModule {}
