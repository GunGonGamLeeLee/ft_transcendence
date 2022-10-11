import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './entity.user';
import { UserInChannelEntity } from './entity.user.in.channel';

@Entity()
export class ChannelEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  chid: number;

  @Column()
  chName: string;

  @Column()
  chOwnerId: number;

  @Column({ default: true })
  display: boolean;

  @Column({ default: false })
  isLocked: boolean;

  @Column()
  password: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({
    name: 'chOwnerId',
    referencedColumnName: 'uid',
  })
  chOwner: UserEntity;

  @OneToMany(
    () => UserInChannelEntity,
    (usersInChannel) => usersInChannel.channel,
  )
  usersInChannel: UserInChannelEntity[];
}
