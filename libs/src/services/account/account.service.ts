import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { Account } from '../../common/index';
import { Express } from 'express';
import {Multer} from 'multer'

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>
  ) {}
  async save(
    email: string,
    password: string,
    fullName: string,
    phone: string,
    address: string,
    isActive?: boolean,
  ): Promise<Account> {
    return this.accountRepository.save(
      new Account({
        email,
        password: password,
        fullName,
        phone,
        address,
        isActive,
      }),
    )
  }
  async update(id: string, account: Partial<Account>) {
    await this.accountRepository.update(id, account);
  }

  async uploadAvatar(userId: string,
    image: Express.Multer.File,
  ) {
    image
  }


  async findUserByEmail(email: string) {
    return this.accountRepository.findOne({where: {email}})
  }
  async findUserById(id: string): Promise<Account | null> {
    return this.accountRepository.findOne({where: {id}})
  }
}
