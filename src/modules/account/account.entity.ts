import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AbstractEntity } from '../../commom/abstract.entity';
import { User } from '../../modules/user/user.entity';

@Entity({ name: 'accounts' })
export class Account extends AbstractEntity {
  @PrimaryColumn()
  username!: string;

  @Column()
  password!: string;

  @Column()
  app!: string;

  @Column()
  role!: number;

  @Column()
  status!: number;

  @ManyToOne(() => User, (user) => user.accounts, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
