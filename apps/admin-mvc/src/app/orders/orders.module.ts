import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { JwtModule } from '@nestjs/jwt';
import { ServicesModule } from '@book-shop/libs';

@Module({
  imports: [ServicesModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
