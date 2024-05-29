import { AwsModule } from '@book-shop/libs';
import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AwsModule,  JwtModule.register({})],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
