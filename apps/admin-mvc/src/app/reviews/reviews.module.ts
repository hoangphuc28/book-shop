import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ServicesModule } from '@book-shop/libs';

@Module({
  imports: [ServicesModule],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
