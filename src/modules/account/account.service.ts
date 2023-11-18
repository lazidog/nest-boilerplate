import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    private readonly configService: ConfigService,
  ) {}

  create(createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsRepository.save(
      this.accountsRepository.create(createAccountDto),
    );
  }

  findAll() {
    return this.configService.get<string>('database.port');
  }
}
