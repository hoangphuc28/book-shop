import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Render,
  Query,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

import { RefreshTokenGuard } from '../../common/guards/refreshToken.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,

  ) { }

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() data: LoginDto
  ) {
      const res = await this.authService.login(data.email, data.password);
      response.cookie('refresh', res.tokens.refreshToken, {
        httpOnly: true, // Cookie chỉ được gửi qua HTTP(S), không thể truy cập bằng JavaScript
        // secure: process.env.NODE_ENV === 'production', // Chỉ gửi cookie qua HTTPS khi ở môi trường production
        // sameSite: 'strict', // Cookie chỉ được gửi trong các request cùng site
      });
      return {
        accessToken: res.tokens.accessToken,
        expiredAt:
          Date.now() +
          this.authService.configService.get(
            'APPS.SERVER.CUSTOMER.JWT.ACCESS.EXPIRES_IN'
          ) *
          1000,
      };
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response, @Req() req: Request) {
    const {refresh} = req.cookies
    this.authService.logout(refresh)
    response.clearCookie('refresh');
  }
  @Post('register')
  async registry(@Body() registerDto: RegisterDto): Promise<any> {
    return this.authService.registry(registerDto);
  }
  //Verify and save user account
  @Get('verify-registry')
  async verify(@Query('token') token: string, @Res() res: Response) {
    try {
      const result = await this.authService.verifyRegistry(token);
      res.redirect(
        `${this.authService.configService.get('APPS.STOREFRONT.HOST') +
        ':' +
        this.authService.configService.get('APPS.STOREFRONT.PORT')
        }/verification/success`
      );
    } catch (error) {
      console.log(error);
      res.redirect(
        `${this.authService.configService.get('APPS.STOREFRONT.HOST') +
        ':' +
        this.authService.configService.get('APPS.STOREFRONT.PORT')
        }/verification/fail`
      );
    }
  }

  //Just send a token to the email for verification
  @Post('password-reset')
  async updatePassword(@Body('email') email: string): Promise<any> {
    try {
      return await this.authService.sendPasswordResetEmail(email);
    } catch (error) {
      return error;
    }
  }
  //verify token and update password
  @Post('verify-password-reset')
  async verifyPasswordReset(
    @Query('token') token: string,
    @Body('password') password: string,
    @Body('passwordConfirm') passwordConfirm: string
  ) {
    console.log(token);
    try {
      return this.authService.verifyPasswordUpdate(
        token,
        password,
        passwordConfirm
      );
    } catch (error) {
      return error;
    }
  }
  @Get('reset-password')
  @Render('reset-password')
  async resetPasswordPage() {
    return {};
  }
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshToken(@Req() request: Request) {
    const { sub, refreshToken }: any = request.user;
    return {
      accessToken: await this.authService.refreshTokens(sub, refreshToken),
      expiredAt:
        Date.now() +
        this.authService.configService.get(
          'APPS.SERVER.CUSTOMER.JWT.ACCESS.EXPIRES_IN'
        ) *
        1000
    }
  }

}
