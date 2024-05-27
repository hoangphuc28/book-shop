import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';



@Controller('account')
export class AccountController {

  @Get('profile')
  async getProfile() {
    return {}
  }
}
