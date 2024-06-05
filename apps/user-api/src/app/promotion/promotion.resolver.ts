import { Resolver, Query } from '@nestjs/graphql';
import { Promotion } from '@book-shop/libs';
import { PromotionService } from '@book-shop/libs';

@Resolver(() => Promotion)
export class PromotionResolver {
  constructor(
    private promotionService: PromotionService
  ) {}

  @Query(() => [Promotion])
  async getPromotions() {
    const res =  await this.promotionService.findAll();
    console.log(res)
    return res
  }
}
