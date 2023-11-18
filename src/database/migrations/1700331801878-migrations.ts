import { Account } from '../../modules/account/account.entity';
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

export class Migrations1700331801878 implements MigrationInterface {
  name = 'Migrations1700331801878';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" character varying NOT NULL, "email" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "photo" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_email" ON "users" ("email") `);
    await queryRunner.query(
      `CREATE TABLE "accounts" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "username" character varying NOT NULL, "password" character varying NOT NULL, "app" character varying NOT NULL, "role" integer NOT NULL, "status" integer NOT NULL, "user_id" character varying, CONSTRAINT "PK_477e3187cedfb5a3ac121e899c9" PRIMARY KEY ("username"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "FK_3000dad1da61b29953f07476324" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

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
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP CONSTRAINT "FK_3000dad1da61b29953f07476324"`,
    );
    await queryRunner.query(`DROP TABLE "accounts"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_email"`);
    await queryRunner.query(`DROP TABLE "users"`);

    await queryRunner.query(`delete from "users" where true`);
    await queryRunner.query(`delete from "accounts" where true`);
  }
}
