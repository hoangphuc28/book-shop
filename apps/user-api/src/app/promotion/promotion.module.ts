import { Module } from '@nestjs/common';
import { PromotionResolver } from './promotion.resolver';
import { ServicesModule } from '@book-shop/libs';

@Module({
  imports: [ServicesModule],
  providers: [PromotionResolver]
})
export class PromotionModule {

}
