import { Admin } from "@book-shop/libs";
import { OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";

export class AdminServiceOneTime implements OnModuleInit {
  constructor(
    private adminRepository: Repository<Admin>,
    private configService: ConfigService
  ) { }
  async createAdminAccount() {

    const userName = this.configService.get('APPS.SERVER.ADMIN.ACCOUNT.USERNAME')
    let password = this.configService.get('APPS.SERVER.ADMIN.ACCOUNT.PASSWORD')
    password = await bcrypt.hash(password,
      bcrypt.genSaltSync()
    )
    this.adminRepository.save({userName, password})
  }
  async onModuleInit() {
    await this.createAdminAccount();
  }
}
