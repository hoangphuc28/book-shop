import { Controller, Get, Post, Body, Patch, Res} from '@nestjs/common';
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
        const {email, password, phone, address, fullName} = registerDto
        return this.authService.verify(email, password, phone, address, fullName)
        // return await this.authService.registry(email, password, fullName, phone, address)
  }
}
