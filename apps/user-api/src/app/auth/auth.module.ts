import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ServicesModule, CoreModule } from '@book-shop/libs';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '@book-shop/libs';
@Module({
  imports: [ServicesModule, JwtModule.register({}), MailModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
