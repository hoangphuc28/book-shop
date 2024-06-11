import { ReviewService } from '@book-shop/libs';
import { Body, Controller, Get, Post, Query, Render, RequestMapping, Res } from '@nestjs/common';
import {Response} from 'express'

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewService) {}



  @Get()
  @Render('reviews/index')
  async list(@Res() res: Response,
  @Query('page') page = 1,
  @Query('limit') limit = 10,
  @Query('rating') rating = 'all',
  @Query('filter') filter = 'approved',
  ) {
    try {
      let ratingInput = 0
        if(rating === 'all')
          ratingInput = 0
        else
          ratingInput = parseInt(rating)
      const res = await this.reviewService.find((filter === 'approved'), page, limit, ratingInput);
      return {data: res, rating: rating, filter: filter}
    } catch (error) {
      console.error('Error occurred while fetching books:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  @Post('edit')
  async updateAccount(@Body() body: { id: string, isActive: string }) {
    try {
      return this.reviewService.update({id: body.id, isActive: (body.isActive === 'true') })
    } catch (error) {
      console.log(error)
      throw new Error("Something error");
    }
  }
}
