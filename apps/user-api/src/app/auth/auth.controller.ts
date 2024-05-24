import { Controller, Get, Post, Body, Patch, Res, Render, Query} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Res({ passthrough: true }) response: Response, @Body() data: LoginDto) {
    return this.authService.login(data.email, data.password, response);
  }
  //Just send a token to the email for verification
  @Post('register')
  async registry(@Body() registerDto: RegisterDto): Promise<any> {
        return this.authService.registry(registerDto)
  }
  //Verify and save user account
  @Get('verify-registry')
  async verify(@Query('token') token: string, @Res() res: Response) {
    try {
      await this.authService.verifyRegistry(token)
      res.redirect('http://127.0.0.1:5500/frontend/admin/success.html')
    } catch (error) {
        res.redirect('http://127.0.0.1:5500/frontend/admin/success.html')
    }
  }

  //Just send a token to the email for verification
  @Post('password-reset')
  async updatePassword(@Body('email') email: string): Promise<any> {
    try {
      return await this.authService.sendPasswordResetEmail(email)
    } catch (error) {
      return error
    }
  }
  //verify token and update password
  @Post('verify-password-reset')
  async verifyPasswordReset(@Query('token') token: string, @Body('password') password: string, @Body('passwordConfirm') passwordConfirm: string) {
    console.log(token)
    try {
      return this.authService.verifyPasswordUpdate(token, password, passwordConfirm)
    } catch (error) {
      return error
    }
  }
  @Get('reset-password')
  @Render('reset-password')
  async resetPasswordPage() {
    return {};
  }
}
