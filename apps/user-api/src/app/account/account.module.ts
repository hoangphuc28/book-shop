import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { Account, AwsModule, ServicesModule } from '@book-shop/libs';
import { AccountResolver } from './account.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ServicesModule, JwtModule.register({})],
  controllers: [AccountController],
  providers: [AccountResolver],
})
export class AccountModule {}
