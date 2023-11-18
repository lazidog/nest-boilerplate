import { Account } from '../modules/account/account.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const accounts: Account[] = [
  {
    username: 'admin',
    password: 'password',
    app: 'lazidog',
    role: 1,
    status: 1,
    user: {
      id: 'uuid1',
      firstName: '',
      lastName: 'admin',
      email: 'admin@gmail.com',
    },
  },
  {
    username: 'tien',
    password: 'password',
    app: 'lazidog',
    role: 2,
    status: 1,
    user: {
      id: 'uuid2',
      firstName: 'Nguyen Van',
      lastName: 'Tien',
      email: 'tien@gmail.com',
    },
  },
];

export class Migrations1700269918323 implements MigrationInterface {
  name = 'Migrations1700269918323';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < accounts.length; i++) {
      const { user, ...account } = accounts[i];
      await queryRunner.query(
        `insert into "users" (id, first_name, last_name, email) values ('${user?.id}', '${user?.firstName}', '${user?.lastName}', '${user?.email}')`,
      );
      await queryRunner.query(
        `insert into "accounts" (username, password, app, role, status, user_id) values ('${account.username}', '${account.password}', '${account.app}', ${account.role}, ${account.status}, '${user?.id}')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`delete from "users" where true`);
    await queryRunner.query(`delete from "accounts" where true`);
  }
}
