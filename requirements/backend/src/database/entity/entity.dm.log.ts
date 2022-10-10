import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './entity.user';

@Entity()
export class DmLogEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  index: number;

  //TODO - include uid?
  // @Column({ type: 'integer' })
  // fromUid: number;

  // @Column({ type: 'integer' })
  // toUid: number;

  @Column({ type: 'timestamptz' })
  time: Date;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.uid)
  fromUser: UserEntity

  @ManyToOne(() => UserEntity, (user) => user.uid)
  toUser: UserEntity
}