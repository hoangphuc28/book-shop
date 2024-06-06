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
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Authentication } from '../../guards/authentication.guard';
import { OrdersService } from '@book-shop/libs';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}



  @UseGuards(Authentication)
  @Get()
  @Render('orders/index')
  async findAll() {
    const orders = await this.ordersService.findAllOrders()
    console.log(orders)
    return {data: orders}

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOrdersByAccountId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return
  }
}
