import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { LoginDto } from './Dto/login.dto';
import { AuthService } from './auth.service';
import {Response} from 'express'
@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }
  @Get('/')
  @Render('index')
  getLogin() {
    return
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() data: LoginDto
  ) {
    console.log(data)
    const res = await this.authService.login(data.userName, data.password);
    response.cookie('refresh', res.tokens.refreshToken, {
      httpOnly: true,
    });

    return {
      accessToken: res.tokens.accessToken,
      expiredAt:
        Date.now() +
        this.authService.configService.get(
          'APPS.SERVER.ADMIN.JWT.ACCESS.EXPIRES_IN'
        ) *
        1000,
    };
  }
}

