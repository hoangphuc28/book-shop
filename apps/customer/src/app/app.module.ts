import { Module } from '@nestjs/common';
import {ConfigModule} from '@book-shop/libs'
@Module({
  imports: [ConfigModule]
})
export class AppModule {}
