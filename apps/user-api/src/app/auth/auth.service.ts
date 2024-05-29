import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AccountService } from '@book-shop/libs';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '@book-shop/libs';

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
  async login(email: string, password: string) {
    try {
      const user = await this.accountService.findUserByEmail(email);
      if (!user)
        throw new BadRequestException('Email or password is incorrect');
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches)
        throw new BadRequestException('Email or password is incorrect');
      const tokens = await this.getTokens(user.id, user.email);
      user.refreshToken = tokens.refreshToken;
      await this.accountService.update(user.id, { refreshToken: user.refreshToken });
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
  async logout(refresh: string) {
    try {
      const { sub } =
        await this.jwtService.verify(refresh, {
          secret: this.configService.get<string>(
            'APPS.SERVER.CUSTOMER.JWT.REFRESH.SECRET'
          ),
        });
      this.accountService.update(sub, { refreshToken: null })
    } catch (error) {
      console.log(error)
      return {
        message: 'Internal server error',
        status: 500,
      };
    }
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
        }/api/auth/verify-registry`;
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
      const userExists = await this.accountService.findUserByEmail(email);
      if (userExists) {
        return;
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
      verifyUrl: redirectUrl + `?token=${token}`,
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
    const redirectUrl = `${this.configService.get('APPS.STOREFRONT.HOST') +
      ':' +
      this.configService.get('APPS.STOREFRONT.PORT')
      }/auth/reset/verify`;
      console.log(redirectUrl)
    if (!userExists) {
      throw new BadRequestException('User does not exists');
    }
    try {
      await this.sendMailVerify(
        'Reset Password For Your Account!',
        redirectUrl,
        userExists.email
      );
      return {
        message: 'Please check your email',
        code: 200,
      };
    } catch (error) {
      throw new BadRequestException('An error occurred');
    }
  }
  async verifyPasswordUpdate(
    token: string,
    password: string,
    confirmPassword: string
  ) {
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
      throw new BadRequestException('Password do not match');
    }
    userExists.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    this.accountService.update(userExists.id, { password: userExists.password });
  }
  async refreshTokens(id: string, refreshToken: string) {
    const user = await this.accountService.findUserById(id);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    if (user.refreshToken !== refreshToken) throw new ForbiddenException('Access Denied');
    const accessToken = this.jwtService.signAsync(
      {
        sub: id,
        email: user.email,
      },
      {
        secret: this.configService.get<string>(
          'APPS.SERVER.CUSTOMER.JWT.ACCESS.SECRET'
        ),
        expiresIn: this.configService.get(
          'APPS.SERVER.CUSTOMER.JWT.ACCESS.EXPIRES_IN'
        ),
      }
    )
    await this.accountService.update(user.id, { refreshToken: refreshToken });
    return accessToken;
  }
}
