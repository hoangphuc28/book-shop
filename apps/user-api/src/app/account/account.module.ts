import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { Account, ServicesModule } from '@book-shop/libs';

import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [],
  controllers: [AccountController],
})
export class AccountModule {}
