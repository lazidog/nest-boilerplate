import { FindOptionsWhere, In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { QueryOption } from 'commom/query.option';
import { CreateUserDto } from './dto/create-user.dto';

export interface UserQueryFilter {
  ids?: any[];
  id?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create(createUserDto),
    );
  }

  findAll(filter: UserQueryFilter = {}, option: QueryOption<User> = {}) {
    const { ids } = filter;
    const { fields, offset, limit } = option;
    const where: FindOptionsWhere<User> = {};
    if (ids) {
      where.id = In(ids);
    }

    return this.usersRepository.find({
      where: where,
      select: fields,
      skip: offset,
      take: limit,
    });
  }
}
