import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigTypes } from 'configs/config.type-definition';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<ConfigTypes>) {}

  private isDevEnv = () => {
    return this.configService.get('app.env', { infer: true }) !== 'prod';
  };

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      url: this.configService.get('database.url', { infer: true }),
      type: this.configService.get('database.type', { infer: true }),
      host: this.configService.get('database.host', { infer: true }),
      port: this.configService.get('database.port', { infer: true }),
      username: this.configService.get('database.username', { infer: true }),
      password: this.configService.get('database.password', { infer: true }),
      database: this.configService.get('database.name', { infer: true }),
      synchronize: this.configService.get('database.synchronize', {
        infer: true,
      }),
      dropSchema: this.isDevEnv(),
      logging: this.isDevEnv(),
      keepConnectionAlive: !this.isDevEnv(),
      entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      subscribers: [__dirname + '/../modules/**/*.subsciber{.ts,.js}'],
    } as TypeOrmModuleOptions;
  }
}
