import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { S3 } from 'aws-sdk'
import { InjectAwsService } from 'nest-aws-sdk';

@Injectable()
export class ResourceService {
  constructor(
    private configService: ConfigService,
    @InjectAwsService(S3) private readonly s3: S3,
  ) { }
  async upload(resource: Express.Multer.File, fileName: string, folder: string) {
    const resourceUploaded: ManagedUpload.SendData = await new Promise(
      (resolve, reject) => {
        this.s3.upload(
          {
            Bucket: this.configService.get('AWS.SERVICES.S3.BUCKET_NAME'),
            Body: resource.buffer,
            Key: `${folder}/${fileName}.jpeg`,
            ContentType: resource.mimetype,
          },
          (error: Error, data: ManagedUpload.SendData) => {
            if (error) {
              reject(error);
            }
            if (data) {
              resolve(data);
            }
          }
        );
      }
    );
  }
}
