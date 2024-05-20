import { Module } from '@nestjs/common';
import {CoreModule} from '@book-shop/libs'
@Module({
  imports: [CoreModule]
})
export class AppModule {}
