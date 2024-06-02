import { Module } from '@nestjs/common';
import { AuthorResolver } from './author.resolver';
import { ServicesModule } from '@book-shop/libs';

@Module({
  imports: [ServicesModule],
  providers: [AuthorResolver]
})
export class AuthorModule {}
