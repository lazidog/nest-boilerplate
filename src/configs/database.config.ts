import { registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import {
  IsOptional,
  IsInt,
  IsString,
  ValidateIf,
  validateSync,
} from 'class-validator';

import { DatabaseConfig } from './config.type-definition';

class EnvironmentVariablesValidator {
  // Connection use url
  @ValidateIf((envValues) => envValues.DB_URL)
  @IsString()
  DB_URL!: string;

  // Connection use params
  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsString()
  DB_TYPE!: string;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsString()
  DB_HOST!: string;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsInt()
  @IsOptional()
  DB_PORT!: number;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsString()
  @IsOptional()
  DB_PASSWORD!: string;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsString()
  DB_NAME!: string;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsString()
  DB_USERNAME!: string;
}

function validateConfig<T extends object>(
  config: Record<string, unknown>,
  envVariablesClass: ClassConstructor<T>,
) {
  const validatedConfig = plainToClass(envVariablesClass, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export default registerAs<DatabaseConfig>('database', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    url: process.env.DB_URL,
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
  };
});
