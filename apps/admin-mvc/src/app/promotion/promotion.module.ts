import { Module } from '@nestjs/common';
import { PromotionController } from './promotion.controller';
import { ServicesModule } from '@book-shop/libs';

@Module({
  imports: [ServicesModule],
  controllers: [PromotionController],
})
export class PromotionModule {}
