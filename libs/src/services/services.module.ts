import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Book } from '../common';
import { AccountService } from './account/account.service';
import { BookService } from './book/book.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Book])],
  providers: [AccountService, BookService],
  exports: [AccountService, BookService],
})
export class ServicesModule {}
