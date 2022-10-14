import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './entity.user';
import { UserInChannelEntity } from './entity.user.in.channel';

export enum ChannelMode {
  public,
  protected,
  private,
  dm,
}

@Entity()
export class ChannelEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  chid: number;

  @Column()
  chName: string;

  @Column({ unique: false })
  chOwnerId: number;

  @Column({ default: 0 })
  mode: ChannelMode;

  @Column()
  password: string;

  @ManyToOne(() => UserEntity, (user) => user.uid)
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
