import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from '../../../common/entities'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE.POSTGRES.HOST'),
        port: configService.get('DATABASE.POSTGRES.POST'),
        username: configService.get('DATABASE.POSTGRES.USERNAME'),
        password: configService.get('DATABASE.POSTGRES.PASSWORD'),
        database: configService.get('DATABASE.POSTGRES.DATABASE'),
        ssl: configService.get('DATABASE.POSTGRES.SSL'),
        // schema: configService.get('DATABASE.POSTGRES.SCHEMA'),
        synchronize: configService.get('DATABASE.POSTGRES.SYNCHRONIZE'),
        autoLoadEntities: true,
        entities: [...Object.values(entities)],
      }),
    }),
  ],
})
export class PostgresModule {}
