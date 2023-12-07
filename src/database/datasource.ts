import 'dotenv/config';
import { SnakeNamingStrategy } from './snake-naming.strategy';
import { DataSource, DataSourceOptions } from 'typeorm';

const isDevEnv = () => {
  return process.env.NODE_ENV !== 'prod';
};

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE,
  url: process.env.DB_URL,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: Boolean(process.env.DB_SYNCHRONIZE === 'true'),
  dropSchema: isDevEnv(),
  logging: isDevEnv(),
  keepConnectionAlive: !isDevEnv(),
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  subscribers: ['src/modules/**/*.subscriber{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
} as DataSourceOptions);
