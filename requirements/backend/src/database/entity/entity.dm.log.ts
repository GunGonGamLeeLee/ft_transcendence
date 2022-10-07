import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './entity.user';

@Entity()
export class DmLogEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  index: number;

  @Column({ type: 'integer' })
  fromUid: number;

  @Column({ type: 'integer' })
  toUid: number;

  @Column({ type: 'bigint' })
  time: number;

  @Column()
  content: string;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: UserEntity[];
}
