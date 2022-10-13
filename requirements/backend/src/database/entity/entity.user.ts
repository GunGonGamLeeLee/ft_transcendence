import { Entity, Column, PrimaryColumn, OneToMany, Unique } from 'typeorm';
import { FriendListEntity } from './entity.friend.list';
import { BlockListEntity } from './entity.block.list';
import { UserInChannelEntity } from './entity.user.in.channel';
// import { DmLogEntity } from './entity.dm.log';
import { MatchHistoryEntity } from './entity.matchhistory.list';

export enum UserStatus {
  OFFLINE,
  ONLINE,
  INGAME,
}

@Entity()
@Unique(['displayName'])
export class UserEntity {
  @PrimaryColumn({ type: 'integer' })
  uid: number;

  @Column()
  displayName: string;

  @Column()
  imgUri: string;

  @Column({ type: 'integer' })
  rating: number;

  @Column({ default: false })
  mfaNeed: boolean;

  @Column()
  qrSecret: string;

  @Column()
  status: UserStatus;

  @Column({ nullable: true })
  gameRoom: string;

  @OneToMany(() => FriendListEntity, (friendList) => friendList.user)
  friendList: FriendListEntity[];

  @OneToMany(() => BlockListEntity, (blockList) => blockList.user)
  blockList: BlockListEntity[];

  @OneToMany(() => UserInChannelEntity, (inChannelList) => inChannelList.user)
  inChannelList: UserInChannelEntity[];

  // @OneToMany(() => DmLogEntity, (dmList) => dmList.fromUser)
  // dmList: DmLogEntity[];

  @OneToMany(() => MatchHistoryEntity, (winnerList) => winnerList.winner)
  winnerList: MatchHistoryEntity[];

  @OneToMany(() => MatchHistoryEntity, (loserList) => loserList.loser)
  loserList: MatchHistoryEntity[];
}
