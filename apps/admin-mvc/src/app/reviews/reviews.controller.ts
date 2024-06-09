import { ReviewService } from '@book-shop/libs';
import { Controller, Get, Query, Render, RequestMapping, Res } from '@nestjs/common';
import {Response} from 'express'

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewService) {}



  @Get()
  @Render('reviews/index')
  async list(@Res() res: Response,
  @Query('page') page = 1,
  @Query('limit') limit = 10,
  @Query('rating') rating = 0,
  ) {
    try {
      if(typeof(rating) === 'string') {
        if(rating === 'all')
          rating = 0
      }
      const res = await this.reviewService.find(false, page, limit, rating);
      console.log(res)
      return {data: res, rating: rating}
    } catch (error) {
      console.error('Error occurred while fetching books:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
