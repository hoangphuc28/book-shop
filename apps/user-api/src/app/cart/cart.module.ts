import { Module } from '@nestjs/common';
import { CartResolver } from './cart.resolver';
import { ServicesModule } from '@book-shop/libs';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ServicesModule,  JwtModule.register({})],
  providers: [CartResolver]

})
export class CartModule {}
