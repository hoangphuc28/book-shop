import { Global, Module } from "@nestjs/common";
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config'
import { readFileSync } from "fs";
import * as yaml from 'js-yaml'
import { join } from 'path'

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [async () => yaml.load(readFileSync(join(__dirname, '../../../config.yaml'), 'utf8'))],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
