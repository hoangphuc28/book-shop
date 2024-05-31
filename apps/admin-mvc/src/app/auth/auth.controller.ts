import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { LoginDto } from './Dto/login.dto';
import { AuthService } from './auth.service';
import {Response, Request} from 'express'
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
    const res = await this.authService.login(data.userName, data.password);
    response.cookie('session', res.tokens.session, {
      httpOnly: true,
    });
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response, @Req() req: Request) {
    const {session} = req.cookies
    console.log()
    this.authService.logout(session)
    response.clearCookie('session');
  }
}

