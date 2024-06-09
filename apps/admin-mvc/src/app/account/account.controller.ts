import { AccountService } from '@book-shop/libs';
import { Body, Controller, Get, Post, Query, Render, Res } from '@nestjs/common';
import {Response} from 'express'

@Controller('accounts')
export class AccountController {
  constructor(
    private accountService: AccountService
  ) { }
  @Get()
  @Render('accounts/index')
  async listAccounts(@Res() res: Response,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search = '',
  ) {
    try {
      const res = await this.accountService.find(false, page, limit, search);
      return {data: res}
    } catch (error) {
      console.error('Error occurred while fetching books:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  @Post('edit')
  async updateAccount(@Body() body: { id: string, isActive: string }) {
    try {
      return this.accountService.update(body.id, { isActive: (body.isActive === 'true') })
    } catch (error) {
      console.log(error)
      throw new Error("Something error");
    }
  }
}
