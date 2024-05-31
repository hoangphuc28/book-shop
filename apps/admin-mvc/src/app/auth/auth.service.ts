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
      admin.refreshToken = tokens.refreshToken;
      await this.adminService.update(admin.id, { refreshToken: admin.refreshToken });
      return {
        tokens,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>(
            'APPS.SERVER.ADMIN.JWT.ACCESS.SECRET'
          ),
          expiresIn: this.configService.get(
            'APPS.SERVER.ADMIN.JWT.ACCESS.EXPIRES_IN'
          ),
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>(
            'APPS.SERVER.ADMIN.JWT.REFRESH.SECRET'
          ),
          expiresIn: this.configService.get(
            'APPS.SERVER.ADMIN.JWT.REFRESH.EXPIRES_IN'
          ),
        }
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
