import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Render,
  UseGuards,
  Query,
  Res,
} from '@nestjs/common';
import { Authentication } from '../../guards/authentication.guard';
import { OrderStatus, OrdersService } from '@book-shop/libs';
import {Response} from 'express'

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @UseGuards(Authentication)
  @Get()
  @Render('orders/index')
  async findAll(@Res() res: Response,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search = '',
    @Query('filter') filter = OrderStatus.PENDING,
  ) {
    try {
      const orders = await this.ordersService.find(page, limit, search, filter)
      const orderStatuses = Object.values(OrderStatus);
      return { data: orders, filter: filter, orderStatuses: orderStatuses, }
    } catch (error) {
      console.error('Error occurred while fetching books:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  @Get('/detail')
  @Render('orders/detail')
  async findOne(@Query('id') id: string) {
    const res = await this.ordersService.findById(id);
    return { data: res, statuses: Object.values(OrderStatus) };
  }
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body: { status }) {
    const updatedOrder = await this.ordersService.updateOrderStatus(id, body.status);
    return { data: updatedOrder };
  }
}
