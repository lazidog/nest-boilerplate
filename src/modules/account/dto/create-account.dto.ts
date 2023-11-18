import {
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
  IsEnum,
} from 'class-validator';

import { IsNotExist } from 'validations/database.validator';
import { AppNameEnum, RoleEnum, AccountStatusEnum } from 'commom/enum';
import { User } from 'modules/user/user.entity';

export class CreateAccountDto {
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], { message: 'Username already exists' })
  username!: string;

  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsEnum(AppNameEnum)
  app!: string;

  @IsOptional()
  @IsEnum(RoleEnum)
  role?: number;

  @IsOptional()
  @IsEnum(AccountStatusEnum)
  status?: number;

  @IsNotEmpty()
  user!: User;
}
