import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { ServicesModule } from '@book-shop/libs';

@Module({
  imports: [ServicesModule],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
