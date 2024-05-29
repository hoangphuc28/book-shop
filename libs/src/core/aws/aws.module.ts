import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const region = configService.get<string>('AWS.REGION');
          const accessKeyId = configService.get<string>('AWS.ACCESS_KEY_ID');
          const secretAccessKey = configService.get<string>('AWS.SECRET_ACCESS_KEY');
          if (!region || !accessKeyId || !secretAccessKey) {
            throw new Error('Missing AWS configuration values');
          }
          return {
            region,
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
          };
        },
      },
      services: [S3],
    }),
  ],
})
export class AwsModule {}
