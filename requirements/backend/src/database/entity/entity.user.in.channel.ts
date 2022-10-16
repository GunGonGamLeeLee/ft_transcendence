import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { ChannelEntity } from './entity.channel';
import { UserEntity } from './entity.user';

export enum UserRoleInChannel {
  OWNER,
  ADMIN,
  USER,
}

@Entity()
@Unique(['uid', 'chid'])
export class UserInChannelEntity {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ type: 'integer' })
  uid: number;

  @Column({ type: 'integer' })
  chid: number;

  @Column()
  role: UserRoleInChannel;

  @Column({ default: false })
  isMute: boolean;

  @Column({ default: false })
  isBan: boolean;

  @ManyToOne(() => UserEntity, (user) => user.inChannelList)
  @JoinColumn({
    name: 'uid',
    referencedColumnName: 'uid',
  })
  user: UserEntity;

  @ManyToOne(() => ChannelEntity, (channel) => channel.usersInChannel)
  @JoinColumn({
    name: 'chid',
    referencedColumnName: 'chid',
  })
  channel: ChannelEntity;
}
