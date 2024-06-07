import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';
import { ServicesModule } from '@book-shop/libs';

@Module({
  imports: [ServicesModule],
  controllers: [AboutController],
})
export class AboutModule {}
