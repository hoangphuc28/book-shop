import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { ServicesModule } from '@book-shop/libs';

@Module({
  imports: [ServicesModule],
  controllers: [AuthorController],
})
export class AuthorModule {}
