import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RelationListEntity } from './entity.relation.list';
import { UserEntity } from './entity.user';

@Entity()
export class FriendListEntity extends RelationListEntity {
  @ManyToOne(() => UserEntity, (user) => user.friendList)
  @JoinColumn({
    name: 'toUid',
    referencedColumnName: 'uid',
  })
  friend: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.followerList)
  @JoinColumn({
    name: 'fromUid',
    referencedColumnName: 'uid',
  })
  follower: UserEntity;
}
