import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ServicesModule, MailModule } from '@book-shop/libs';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [JwtModule.register({}), AdminModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
