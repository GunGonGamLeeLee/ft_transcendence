import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToMany(
    () => UserInChannelEntity,
    (usersInChannel) => usersInChannel.channel,
  )
  usersInChannel: UserInChannelEntity[];
}
