import {   PromotionService } from '@book-shop/libs';
import { Controller, Get, Render, Res } from '@nestjs/common';
import {Response} from 'express'

@Controller('promotions')
export class PromotionController {
  constructor(
    private promotionService: PromotionService
  ) {}
  @Get()
  @Render('promotions/index')
  async list(@Res() res: Response
  ) {
    try {
      const authors = await this.promotionService.findAll();
      return {data: authors}
    } catch (error) {
      console.error('Error occurred while fetching books:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  @Get('create')
  @Render('promotions/create')
  async createForm() {
    // return { levels: Object.values(PromotionLevel) };
    return {};
  }

}
