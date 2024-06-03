import { Admin, Book } from '@book-shop/libs';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private configService: ConfigService
  ) {
  //   const userName = this.configService.get('APPS.SERVER.ADMIN.ACCOUNT.USERNAME')
  //   let password = this.configService.get('APPS.SERVER.ADMIN.ACCOUNT.PASSWORD')
  //   const name = this.configService.get('APPS.SERVER.ADMIN.ACCOUNT.NAME')
  //   password = bcrypt.hashSync(password,
  //     bcrypt.genSaltSync()
  //   )
  //   this.adminRepository.save({ userName, password, name })
  // }
  // async save(userName: string, password: string) {
  //   password = await bcrypt.hash(password,
  //     bcrypt.genSaltSync()
  //   )
  //   this.adminRepository.save({ userName, password })
  }
  async findAdmin(userName: string) {
    return this.adminRepository.findOne({where: {userName}})
  }
  async update(id: string, data: Partial<Admin>) {
    await this.adminRepository.update(id, data);
  }


}


