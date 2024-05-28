import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AccountService } from 'libs/src/services/account/account.service';
import { AccessTokenGuard } from '../../common/guards/accessToken.guard';
import { Request } from 'express';



@Controller('account')
export class AccountController {
  constructor(
    private accountService: AccountService
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get('information')
  async getProfile(@Req() req: Request) {

    try {
      return await this.accountService.findUserById(req.user['sub'])
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
