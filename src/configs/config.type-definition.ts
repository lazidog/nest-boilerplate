export type AppConfig = {
  env: string;
  name: string;
  port: number;
};

export type DatabaseConfig = {
  url?: string;
  type?: string;
  host?: string;
  port?: number;
  password?: string;
  name?: string;
  username?: string;
  synchronize?: boolean;
};

export type ConfigTypes = {
  database: DatabaseConfig;
  app: AppConfig;
};
