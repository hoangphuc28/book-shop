import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt'
import { Account } from 'libs/src/common';

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

  async findUserByEmail(email: string): Promise<Account | null> {
    return this.accountRepository.findOne({where: {email}})
  }
}
