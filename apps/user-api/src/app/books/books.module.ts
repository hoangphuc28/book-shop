import { ServicesModule } from '@book-shop/libs';
import { Module } from '@nestjs/common';
import { BookResolver } from './book.resolver';

@Module({
  imports: [ServicesModule],
  providers: [BookResolver],
})
export class BooksModule {}
