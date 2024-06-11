import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplyPromotionDto, CreatePromotionDto, Order, OrderLevelValidationRule, ProductLevelValidationRule, Promotion, UpdatePromotionDto } from '../../common';
import { Repository } from 'typeorm';
import { PromotionLevel } from '../../common/constants';
import { BookService } from '../book/book.service';
import { LessThanOrEqual } from 'typeorm';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}

  async findAll(includeActive: boolean): Promise<Promotion[]> {
    const currentDate = new Date();
    if(includeActive)
      return this.promotionRepository.find({where: {isActive: true,  endDate: LessThanOrEqual(currentDate)}, order: {createdAt: 'ASC'}});
    return this.promotionRepository.find()
  }

  async findOne(id: string): Promise<Promotion> {
    const promotion = await this.promotionRepository.findOne({where: {id: id}});
    if (!promotion) {
      throw new NotFoundException(`Promotion with id ${id} not found`);
    }
    return promotion;
  }

  async create(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const promotion = this.promotionRepository.create(createPromotionDto);
    return this.promotionRepository.save(promotion);
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto): Promise<Promotion> {
    const promotion = await this.findOne(id);
    Object.assign(promotion, updatePromotionDto);
    return this.promotionRepository.save(promotion);
  }

  async applyPromotion(order: Order): Promise<any> {
    const promotion = await this.findOne(order.promotionId);

    if (!promotion) {
      throw new NotFoundException(`Promotion with id ${order.promotionId} not found`);
    }
    switch (promotion.level) {
      case PromotionLevel.Level_Order: {
        const orderRule = promotion.validationRule as OrderLevelValidationRule;
          if(order.total < orderRule.limit) {
            return {success: false, discount: 0}
          }
          return {success: true, discount: order.total*orderRule.percentage/100}
      }
      case PromotionLevel.Level_Product: {
        const productRule = promotion.validationRule as ProductLevelValidationRule;
        const doesCartContainPromotionProduct = order.orderItems.some(item =>
          productRule.productIdList.includes(item?.book?.id)
        );
        if(!doesCartContainPromotionProduct) {
          return {success: false, discount: 0}
        }
        return {success: true, discount: productRule.discountValuePerProduct}
      }
      default: {
        return {success: false, discount: 0}
      }
    }
  }
}
