import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { ServicesModule } from '@book-shop/libs';

@Module({
  imports: [ServicesModule],
  controllers: [AccountController],
})
export class AccountModule {}
