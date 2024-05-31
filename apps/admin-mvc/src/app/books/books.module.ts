import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { AwsModule, ServicesModule } from '@book-shop/libs';
import { JwtModule } from '@nestjs/jwt';

@Module({

  imports: [AwsModule, ServicesModule],
  controllers: [BooksController],
})
export class BooksModule {}
