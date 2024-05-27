import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { AccountService } from 'libs/src/services/account/account.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { MailService } from 'libs/src/core/mail/mail.service';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as ejs from 'ejs';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    public configService: ConfigService,
    private mailService: MailService
  ) { }
  async login(
    email: string,
    password: string,
    @Res() response: Response
  ): Promise<any> {
    const user = await this.accountService.findUserByEmail(email);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.email);
    user.refreshToken = tokens.refreshToken;
    response.cookie('refresh', tokens.refreshToken, {
      httpOnly: true, // Cookie chỉ được gửi qua HTTP(S), không thể truy cập bằng JavaScript
      // secure: process.env.NODE_ENV === 'production', // Chỉ gửi cookie qua HTTPS khi ở môi trường production
      sameSite: 'strict', // Cookie chỉ được gửi trong các request cùng site
    });
    return {
      information: await this.accountService.update(user),
      accessToken: tokens.accessToken,
      expiredAt:
        Date.now() +
        this.configService.get('APPS.SERVER.CUSTOMER.JWT.ACCESS.EXPIRES_IN') *
        1000,
    };
  }
  async registry(registerDto: RegisterDto): Promise<any> {
    const userExists = await this.accountService.findUserByEmail(
      registerDto.email
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    try {
      registerDto.password = bcrypt.hashSync(
        registerDto.password,
        bcrypt.genSaltSync()
      );
      const redirectUrl = `${this.configService.get('APPS.SERVER.CUSTOMER.HOST') +
        ':' +
        this.configService.get('APPS.SERVER.CUSTOMER.PORT')
        }/api/auth/verify-registry`
      await this.sendMailVerify(
        'Thanks for Sigin Up!',
        redirectUrl,
        registerDto.email,
        registerDto.phone,
        registerDto.fullName,
        registerDto.address,
        registerDto.password
      );
      return {
        message: 'Register successfully! Please verify your account',
        code: 200,
      };
    } catch (error) {
      throw new BadRequestException('An error occurred');
    }
  }

  async verifyRegistry(token: string): Promise<any> {
    try {
      const { email, password, phone, address, fullName } =
        await this.jwtService.verify(token, {
          secret: this.configService.get<string>(
            'APPS.SERVER.CUSTOMER.JWT.VERIFY.SECRET'
          ),
        });
      const userExists = await this.accountService.findUserByEmail(
        email
      );
      if (userExists) {
        return
      }
      return await this.accountService.save(
        email,
        password,
        fullName,
        phone,
        address,
        true
      );
    } catch (error) {
      return error;
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
            'APPS.SERVER.CUSTOMER.JWT.ACCESS.SECRET'
          ),
          expiresIn: this.configService.get(
            'APPS.SERVER.CUSTOMER.JWT.ACCESS.EXPIRES_IN'
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
            'APPS.SERVER.CUSTOMER.JWT.REFRESH.SECRET'
          ),
          expiresIn: this.configService.get(
            'APPS.SERVER.CUSTOMER.JWT.REFRESH.EXPIRES_IN'
          ),
        }
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async sendMailVerify(
    content: string,
    redirectUrl: string,
    email: string,
    phone?: string,
    fullName?: string,
    address?: string,
    password?: string,


  ): Promise<any> {
    const expireIn = this.configService.get(
      'APPS.SERVER.CUSTOMER.JWT.VERIFY.EXPIRES_IN'
    );
    const secretKey = this.configService.get<string>(
      'APPS.SERVER.CUSTOMER.JWT.VERIFY.SECRET'
    );
    const templatePath = join(__dirname, 'templates/verify.ejs');
    const token = await this.jwtService.signAsync(
      { email, phone, fullName, address, password },
      {
        secret: secretKey,
        expiresIn: expireIn,
      }
    );
    const data = await readFileSync(templatePath, 'utf8');
    const htmlContent = ejs.render(data, {
      content: content,
      name: fullName,
      verifyUrl: redirectUrl + `?token=${token}`
    });

    await this.mailService.sendMail(
      email,
      'Verify Account',
      'Verify Account',
      htmlContent
    );
  }
  async sendPasswordResetEmail(email: string): Promise<any> {
    const userExists = await this.accountService.findUserByEmail(email);
    const redirectUrl = `${this.configService.get('APPS.SERVER.CUSTOMER.HOST') +
      ':' +
      this.configService.get('APPS.SERVER.CUSTOMER.PORT')
      }/api/auth/reset-password`
    if (!userExists) {
      throw new BadRequestException('User does not exists');
    }
    try {
      await this.sendMailVerify('Reset Password For Your Account!', redirectUrl, userExists.email);
      return {
        message: 'Please check your email',
        code: 200,
      };
    } catch (error) {
      throw new BadRequestException('An error occurred');
    }
  }
  async verifyPasswordUpdate(token: string, password: string, confirmPassword: string) {
    const { email } = await this.jwtService.verify(token, {
      secret: this.configService.get<string>(
        'APPS.SERVER.CUSTOMER.JWT.VERIFY.SECRET'
      ),
    });
    const userExists = await this.accountService.findUserByEmail(email);
    if (!userExists) {
      throw new BadRequestException('User does not exists');
    }
    if (password !== confirmPassword) {
      throw new BadRequestException('Password do not match')
    }
    userExists.password = bcrypt.hashSync(
      password,
      bcrypt.genSaltSync()
    );
    this.accountService.update(userExists)
  }
}
