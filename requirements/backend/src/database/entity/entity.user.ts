import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { FriendListEntity } from './entity.friend.list';
import { BlockListEntity } from './entity.block.list';
// import { MatchHistoryEntity } from './entity.matchhistory.list';

@Entity()
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

  @OneToMany(() => FriendListEntity, (friendList) => friendList.user)
  friendList: FriendListEntity[];

  @OneToMany(() => BlockListEntity, (blockList) => blockList.user)
  blockList: BlockListEntity[];

  // @OneToMany(() => MatchHistoryEntity, (matchHistory) => matchHistory.user)
  // matchHistory: MatchHistoryEntity[];
}
