import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplyPromotionDto, CreatePromotionDto, Promotion, UpdatePromotionDto } from '../../common';
import { Repository } from 'typeorm';
import { PromotionLevel } from '../../common/constants';


@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}

  async findAll(): Promise<Promotion[]> {
    return this.promotionRepository.find();
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

  async applyPromotion(applyPromotionDto: ApplyPromotionDto): Promise<any> {
    const promotion = await this.findOne(applyPromotionDto.promotionId);
    if (!promotion) {
      throw new NotFoundException(`Promotion with id ${applyPromotionDto.promotionId} not found`);
    }
    if (promotion.level === PromotionLevel.Level_Order) {
      // Apply order level promotion
    } else if (promotion.level === PromotionLevel.Level_Product) {
      // Apply product level promotion
    }

    return { success: true, discount: 0 };
  }
}
