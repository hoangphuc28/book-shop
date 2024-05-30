import { Module } from '@nestjs/common';
import { Account, AwsModule, ServicesModule } from '@book-shop/libs';
import { AccountResolver } from './account.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ServicesModule, JwtModule.register({})],
  providers: [AccountResolver],
})
export class AccountModule {}
