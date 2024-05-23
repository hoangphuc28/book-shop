import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { Account } from '@book-shop/libs';
import { AccountService } from 'libs/src/services/account/account.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { MailService } from 'libs/src/core/mail/mail.service';
import { readFile } from 'fs';
import { join } from 'path';
import * as ejs from 'ejs';
@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService
  ) { }
  async login(email: string, password: string, @Res() response: Response): Promise<any> {
    const user = await this.accountService.findUserByEmail(email);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await bcrypt.compare(password, user.password)
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.email);
    user.refreshToken = tokens.refreshToken
    response.cookie('refresh', tokens.refreshToken)
    return {
      information: await this.accountService.update(user),
      accessToken: tokens.accessToken,
      expiredAt: Date.now() + this.configService.get('APPS.SERVER.CUSTOMER.JWT.ACCESS.EXPIRES_IN') * 1000
    }

  }
  async verify(
    email: string,
    password: string,
    fullName: string,
    phone: string,
    address: string
  ): Promise<any> {
    const templatePath = join(__dirname, '../../../apps/user-api/static/verify.ejs')
    await readFile(templatePath, 'utf8', (err, data) => {
      if (err)
        throw new BadRequestException(err)
      const htmlContent = ejs.render(data, {
        verifyUrl: 'http:3000/abc',
      });
      this.mailService.sendMail(email, 'Verify Account', 'Verify Account', htmlContent)
    });
  }
  async registry(
    email: string,
    password: string,
    fullName: string,
    phone: string,
    address: string
  ): Promise<any> {
    const userExists = await this.accountService.findUserByEmail(email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const newAccount = await this.accountService.save(
      email,
      bcrypt.hashSync(password, bcrypt.genSaltSync()),
      fullName,
      phone,
      address
    );
    const tokens = await this.getTokens(newAccount.id, newAccount.email);
    newAccount.refreshToken = tokens.refreshToken
    return {
      information: await this.accountService.update(newAccount),
      tokens: tokens
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
          secret: this.configService.get<string>('APPS.SERVER.CUSTOMER.JWT.ACCESS.SECRET'),
          expiresIn: this.configService.get('APPS.SERVER.CUSTOMER.JWT.ACCESS.EXPIRES_IN'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('APPS.SERVER.CUSTOMER.JWT.REFRESH.SECRET'),
          expiresIn: this.configService.get('APPS.SERVER.CUSTOMER.JWT.REFRESH.EXPIRES_IN'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

}
