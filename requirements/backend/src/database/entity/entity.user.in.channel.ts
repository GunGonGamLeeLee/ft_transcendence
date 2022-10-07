import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ChannelEntity } from './entity.channel';
import { UserEntity } from './entity.user';

export enum UserRoleInChannel {
  OWNER,
  ADMIN,
  USER,
}

@Entity()
export class UserInChannelEntity {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ type: 'integer' })
  uid: number;

  @Column({ type: 'integer' })
  chid: number;

  @Column()
  userRole: UserRoleInChannel;

  @Column({ default: false })
  isMute: boolean;

  @Column({ default: false })
  isBan: boolean;

  @ManyToOne(() => UserEntity, (user) => user.inChannelList)
  user: UserEntity;

  @ManyToOne(() => ChannelEntity, (channel) => channel.usersInChannel)
  channel: ChannelEntity;
}
