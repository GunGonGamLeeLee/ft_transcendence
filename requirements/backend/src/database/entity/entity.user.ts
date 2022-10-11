import { Entity, Column, PrimaryColumn, OneToMany, Unique } from 'typeorm';
import { FriendListEntity } from './entity.friend.list';
import { BlockListEntity } from './entity.block.list';
import { UserInChannelEntity } from './entity.user.in.channel';
// import { DmLogEntity } from './entity.dm.log';
// import { MatchHistoryEntity } from './entity.matchhistory.list';

export enum UserStatus {
  OFFLINE,
  ONLINE,
  INGAME,
  INCHANNEL,
}

@Entity()
@Unique(['displayName'])
export class UserEntity {
  @PrimaryColumn({ type: 'integer' })
  uid: number;

  @Column()
  displayName: string;

  @Column()
  avatarPath: string;

  @Column({ type: 'integer' })
  rating: number;

  @Column({ default: false })
  isRequiredTFA: boolean;

  @Column()
  qrSecret: string;

  @Column()
  userStatus: UserStatus;

  @OneToMany(() => FriendListEntity, (friendList) => friendList.user)
  friendList: FriendListEntity[];

  @OneToMany(() => BlockListEntity, (blockList) => blockList.user)
  blockList: BlockListEntity[];

  @OneToMany(() => UserInChannelEntity, (inChannelList) => inChannelList.user)
  inChannelList: UserInChannelEntity[];

  // @OneToMany(() => DmLogEntity, (dmList) => dmList.fromUser)
  // dmList: DmLogEntity[];
  // @OneToMany(() => MatchHistoryEntity, (matchHistory) => matchHistory.user)
  // matchHistory: MatchHistoryEntity[];
}
