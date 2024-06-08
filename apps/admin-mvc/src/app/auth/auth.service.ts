import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    public configService: ConfigService,

  ) { }
  async login(email: string, password: string) {
    try {
      const admin = await this.adminService.findAdmin(email);
      if (!admin)
        throw new BadRequestException('Email or password is incorrect');
      const passwordMatches = await bcrypt.compare(password, admin.password);
      if (!passwordMatches)
        throw new BadRequestException('Email or password is incorrect');
      const tokens = await this.getTokens(admin.id, admin.userName);
      admin.session = tokens.session;
      await this.adminService.update(admin.id, { session: admin.session });
      return {
        tokens,
      };
    } catch (error) {
      console.log(error)
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
  async logout(session: string) {
    try {
      const { sub } =
        await this.jwtService.verify(session);
      this.adminService.update(sub, { session: null })
    } catch (error) {
      console.log(error)
      return {
        message: 'Internal server error',
        status: 500,
      };
    }
  }
  async getTokens(userId: string, email: string) {
    const session = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        expiresIn: this.configService.get(
          'APPS.SERVER.ADMIN.JWT.SESSION.EXPIRES_IN'
        ),
      }
    )
    return {
      session,
    };
  }
}
