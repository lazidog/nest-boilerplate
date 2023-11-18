import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from 'shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule, SharedModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
