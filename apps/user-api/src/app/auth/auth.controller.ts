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

  @Post('/register')
  async registry(@Body() registerDto: RegisterDto): Promise<any> {
        return this.authService.verify(registerDto)
  }
  @Post('verify')
  async verify(@Query('token') token: string) {
    return this.authService.registry(token)
  }
  @Get('verify')
  @Render('verify')
  getIndex() {
    return { message: 'Hello from NestJS!' };
  }
}
