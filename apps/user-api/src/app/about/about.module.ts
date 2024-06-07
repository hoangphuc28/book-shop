import { ServicesModule } from '@book-shop/libs';
import { Module } from '@nestjs/common';
import { AboutPageResolver } from './about.resolver';


@Module({
  imports: [ServicesModule],
  providers: [AboutPageResolver],
})
export class AboutModule {}
