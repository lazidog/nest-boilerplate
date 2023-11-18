import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from './account.entity';
import { SharedModule } from 'shared/shared.module';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), ConfigModule, SharedModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
