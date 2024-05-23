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
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService
  ) {}
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
    response.cookie('refresh', tokens.refreshToken);
    return {
      information: await this.accountService.update(user),
      accessToken: tokens.accessToken,
      expiredAt:
        Date.now() +
        this.configService.get('APPS.SERVER.CUSTOMER.JWT.ACCESS.EXPIRES_IN') *
          1000,
    };
  }
  async verify(registerDto: RegisterDto): Promise<any> {
    try {
      const userExists = await this.accountService.findUserByEmail(registerDto.email);
      if (userExists) {
        throw new BadRequestException('User already exists');
      }
      registerDto.password = bcrypt.hashSync(
        registerDto.password,
        bcrypt.genSaltSync()
      );
      const expired = this.configService.get(
        'APPS.SERVER.CUSTOMER.JWT.VERIFY.EXPIRES_IN'
      );
      const secretKey = this.configService.get<string>(
        'APPS.SERVER.CUSTOMER.JWT.VERIFY.SECRET'
      );
      const templatePath = join(__dirname, 'assets/mail-verify.ejs');
      const token = await this.jwtService.signAsync(registerDto, {
        secret: secretKey,
        expiresIn: expired,
      });
      readFile(templatePath, 'utf8', (err, data) => {
        if (err) throw new BadRequestException(err);
        const htmlContent = ejs.render(data, {
          name: registerDto.fullName,
          verifyUrl: `${
            this.configService.get('APPS.SERVER.CUSTOMER.HOST') +
            ':' +
            this.configService.get('APPS.SERVER.CUSTOMER.PORT')
          }/api/auth/verify?token=${token}`,
        });
        this.mailService.sendMail(
          registerDto.email,
          'Verify Account',
          'Verify Account',
          htmlContent
        );
      });
      return {
        message: 'Register successlly! Please verify your account',
        code: 200,
      };
    } catch (error) {
      return error;
    }
  }
  async registry(token: string): Promise<any> {
    try {
      const { email, password, phone, address, fullName } =
        await this.jwtService.verify(token, {
          secret: this.configService.get<string>(
            'APPS.SERVER.CUSTOMER.JWT.VERIFY.SECRET'
          ),
        });
      const newAccount = await this.accountService.save(
        email,
        password,
        fullName,
        phone,
        address,
        true
      );
      const tokens = await this.getTokens(newAccount.id, newAccount.email);
      newAccount.refreshToken = tokens.refreshToken;
      return {
        information: await this.accountService.update(newAccount),
        tokens: tokens,
      };
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
}
