import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [ConfigModule, MailModule],
})
export class CoreModule {}
