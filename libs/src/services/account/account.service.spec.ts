import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Account, PaginationResultDto } from '../../common';


const mockAccountRepository = () => ({
  createQueryBuilder: jest.fn(() => ({
    andWhere: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
  })),
  save: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
});

const mockConfigService = () => ({
  get: jest.fn(),
});

describe('AccountService', () => {
  let service: AccountService;
  let repository: ReturnType<typeof mockAccountRepository>;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: getRepositoryToken(Account), useFactory: mockAccountRepository },
        { provide: ConfigService, useFactory: mockConfigService },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repository = module.get(getRepositoryToken(Account));
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    it('should return a paginated result of accounts', async () => {
      const mockAccounts = [new Account({}), new Account({})];
      repository.createQueryBuilder().getManyAndCount.mockResolvedValue([mockAccounts, 2]);

      const result = await service.find(true, 1, 2, 'test');
      expect(result).toEqual(new PaginationResultDto(mockAccounts, 2, 1, 2));
    });
  });

  describe('save', () => {
    it('should save a new account', async () => {
      const mockAccount = new Account({});
      repository.save.mockResolvedValue(mockAccount);

      const result = await service.save('test@test.com', 'password', 'Full Name', '123456789', 'Address', true);
      expect(result).toEqual(mockAccount);
    });
  });

  describe('update', () => {
    it('should update an existing account', async () => {
      const id = '1';
      const account = { fullName: 'New Name' };
      repository.update.mockResolvedValue(null);

      await service.update(id, account);
      expect(repository.update).toHaveBeenCalledWith(id, account);
    });
  });

  describe('findUserByEmail', () => {
    it('should find an account by email', async () => {
      const mockAccount = new Account({});
      repository.findOne.mockResolvedValue(mockAccount);

      const result = await service.findUserByEmail('test@test.com');
      expect(result).toEqual(mockAccount);
    });
  });

  describe('findUserById', () => {
    it('should find an account by id and set avatar URL', async () => {
      const mockAccount = new Account({});
      repository.findOne.mockResolvedValue(mockAccount);
      configService.get.mockReturnValue('mock-bucket');
      const result = await service.findUserById('1');
      expect(result).toEqual({
        ...mockAccount,
        avatar: 'https://mock-bucket.s3.amazonaws.com/users/1.jpeg',
      });
    });
  });
});
