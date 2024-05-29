import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { MailModule } from './mail/mail.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [ConfigModule, MailModule, AwsModule],
})
export class CoreModule {}
