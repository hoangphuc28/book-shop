import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ManagedUpload } from 'aws-sdk/clients/s3'
import { S3 } from 'aws-sdk'
import { InjectAwsService } from 'nest-aws-sdk';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ResourceService {
  constructor(
    private configService: ConfigService,
    @InjectAwsService(S3) private readonly s3: S3,
  ) {}
  async uploadAvatar(userId: string, image: Express.Multer.File) {
    if (!image) {
      throw new BadRequestException('File is not provided');
    }
    try {
      const imageUploaded: ManagedUpload.SendData = await new Promise((resolve, reject) => {
        this.s3.upload(
          {
            Bucket: this.configService.get('AWS.SERVICES.S3.BUCKET_NAME'),
            Body: image.buffer,
            Key: `users/${userId}.jpeg`,
            ContentType: image.mimetype,
          },
          (error: Error, data: ManagedUpload.SendData) => {
            if (error) {
              reject(error)
            }
            if (data) {
              resolve(data)
            }
          },
        )
      })
      return {
        message: 'Upload avatar successfully',
        code: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to upload file');
    }
  }
}
