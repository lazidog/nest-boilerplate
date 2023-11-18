import { registerAs } from '@nestjs/config';
import { IsOptional, IsInt, IsString, ValidateIf } from 'class-validator';

import { DatabaseConfig } from './config.type-definition';
import validateConfig from 'validations/config.validation';

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
