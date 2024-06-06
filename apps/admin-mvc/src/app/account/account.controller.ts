import { AccountService } from '@book-shop/libs';
import { Body, Controller, Get, Post, Render } from '@nestjs/common';

@Controller('accounts')
export class AccountController {
  constructor(
    private accountService: AccountService
  ) { }
  @Get()
  @Render('accounts/index')
  async listAccounts() {
    const res = await this.accountService.findAll()
    return { data: res }
  }
  @Post('edit')
  async updateAccount(@Body() body: { id: string, isActive: string }) {
    console.log(body)
    try {
      return this.accountService.update(body.id, { isActive: (body.isActive === 'true') })
    } catch (error) {
      console.log(error)
      throw new Error("Something error");
    }
  }
}
