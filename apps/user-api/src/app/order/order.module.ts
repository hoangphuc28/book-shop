import { Module } from '@nestjs/common';
import { ServicesModule } from '@book-shop/libs';
import { OrderResolver } from './order.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[ServicesModule, JwtModule.register({})],
  providers: [OrderResolver],
})
export class OrderModule {}
