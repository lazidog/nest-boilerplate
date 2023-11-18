import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { AbstractEntity } from '../../commom/abstract.entity';
import { Account } from '../../modules/account/account.entity';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ type: String, unique: true })
  @Index('IDX_email')
  email!: string;

  @Column({ type: String, nullable: true })
  firstName?: string;

  @Column({ type: String, nullable: true })
  lastName?: string;

  @Column({ type: String, nullable: true })
  photo?: string;

  @OneToMany(() => Account, (account) => account.user, { lazy: true })
  accounts?: Account[];
}
