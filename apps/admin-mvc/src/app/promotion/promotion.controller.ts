import {
  BookService,
  CreatePromotionDto,
  OrderLevelValidationRule,
  ProductLevelValidationRule,
  Promotion,
  PromotionLevel,
  PromotionService,
  UpdatePromotionDto,
} from '@book-shop/libs';
import { Body, Controller, Get, Post, Query, Render, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Authentication } from '../../guards/authentication.guard';

@UseGuards(Authentication)
@Controller('promotions')
export class PromotionController {
  constructor(
    private promotionService: PromotionService,
    private productService: BookService
  ) { }
  @Get()
  @Render('promotions/index')
  async list(@Res() res: Response) {
    try {
      const promotions = await this.promotionService.findAll(false);
      return { data: promotions };
    } catch (error) {
      console.error('Error occurred while fetching books:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  @Get('create')
  @Render('promotions/create')
  async createForm() {
    return { levels: Object.values(PromotionLevel) };
  }

  @Post()
  async create(@Body() promotion: CreatePromotionDto, @Res() res: Response) {
    try {
      promotion.isActive = (promotion.isActive.toString() === 'true')

      if (promotion.level === PromotionLevel.Level_Order) {
        const temp: OrderLevelValidationRule = {
          limit: 0,
          percentage: 0
        };
        promotion.validationRule = temp;
      } else {
        const temp: ProductLevelValidationRule = {
          productIdList: [],
          discountValuePerProduct: 0
        };
        promotion.validationRule = temp;
      }

      this.promotionService.create(promotion);
      return res.redirect('/promotions');
    } catch (error) {
      console.error('Error occurred while saving book:', error);
      return res.redirect('/error');
    }
  }
  @Get('edit')
  @Render('promotions/edit')
  async editForm(@Query('id') id: string) {
    const promotion = await this.promotionService.findOne(id);
    return { item: promotion, levels: Object.values(PromotionLevel) };
  }
  @Post('edit')
  async update(@Body() promotion: UpdatePromotionDto, @Res() res: Response) {
    promotion.isActive = (promotion.isActive.toString() === 'true')
    try {
      this.promotionService.update(promotion.id, promotion);
      return res.redirect('/promotions');
    } catch (error) {
      console.error('Error occurred while saving book:', error);
      return res.redirect('/error');
    }
  }

  @Get('edit/condition')
  @Render('promotions/condition/index')
  async editCondition(@Query('id') id: string) {

    const promotion = await this.promotionService.findOne(id);
    let condition = 0;
    switch (promotion.level) {
      case PromotionLevel.Level_Order:
        condition = 1
        break;
      case PromotionLevel.Level_Product:
        condition = 2
        break;
    }
    const products = await this.productService.findAll()
    return { item: promotion, condition: condition, products: products };
  }
  @Post('edit/condition')
  async updateCondition(@Body() data: any, @Res() res: Response) {
    try {
      const { id, condition } = data
      const promotion = await this.promotionService.findOne(id)

      switch (parseInt(condition)) {
        case 1: {
          const { limit, percentage } = data
          const validationRule: OrderLevelValidationRule = {
            limit: parseFloat(limit),
            percentage: parseFloat(percentage)
          }
          promotion.validationRule = validationRule

          break;
        }
        case 2: {
          if (!Array.isArray(data.productIdList)) {
            data.productIdList = [data.productIdList];
          }
          const { productIdList, discountValuePerProduct } = data
          const validationRule: ProductLevelValidationRule = {
            productIdList: productIdList,
            discountValuePerProduct: parseFloat(discountValuePerProduct)
          };

          promotion.validationRule = validationRule
          break;
        }
      }

      const temp = new UpdatePromotionDto();
      Object.assign(temp, promotion)
      await this.promotionService.update(promotion.id, temp)
      res.redirect('/promotions')
    } catch (error) {
      console.error('Error occurred while saving book:', error);
      return res.redirect('/error');
    }
  }

}
