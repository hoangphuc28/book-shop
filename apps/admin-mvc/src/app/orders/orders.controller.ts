import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Authentication } from '../../guards/authentication.guard';
import { OrderStatus, OrdersService } from '@book-shop/libs';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(Authentication)
  @Get()
  @Render('orders/index')
  async findAll() {
    const orders = await this.ordersService.findAllOrders()
    return {data: orders}

  }

  @Get('/detail')
  @Render('orders/detail')
  async findOne(@Query('id') id: string) {
    const res = await this.ordersService.findById(id);
    console.log(res);
    return { data: res, statuses: Object.values(OrderStatus) };
  }
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body: {status}) {
    console.log(body)
    const updatedOrder = await this.ordersService.updateOrderStatus(id, body.status);
    return { data: updatedOrder };
  }
}
