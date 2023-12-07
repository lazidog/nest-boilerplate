import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { UserService } from './user.service';
import { LimitRecordPerQueryOf } from 'commom/enum';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createPost(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query('page') page: string = '1') {
    const limit = LimitRecordPerQueryOf.user;
    const offset = (Number(page) - 1) * limit;
    return this.userService.findAll(
      {},
      { fields: { firstName: true, lastName: true }, offset, limit },
    );
  }
}
