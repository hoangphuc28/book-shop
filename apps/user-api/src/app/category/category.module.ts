import { ServicesModule } from '@book-shop/libs';
import { Module } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';

@Module({
  imports: [ServicesModule],
  providers: [CategoryResolver]
})
export class CategoryModule {}
