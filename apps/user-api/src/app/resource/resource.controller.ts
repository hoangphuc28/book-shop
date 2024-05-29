import { BadRequestException, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from '../../common/guards/accessToken.guard';
import { ResourceService } from './resource.service';
import { Request } from 'express';

@Controller('resource')
export class ResourceController {
  constructor(
    private resourceService: ResourceService
  ) {}
  @UseGuards(AccessTokenGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('image'))
  async uploadAvatar(
    @Req() request: Request,
    @UploadedFile() image: Express.Multer.File,
  ) {
     try {
      const { sub }: any = request.user;
      return await this.resourceService.uploadAvatar(sub, image)
     } catch (error) {
      throw Error(error)
     }
  }
}
