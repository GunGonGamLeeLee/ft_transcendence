import { Entity, ManyToOne } from 'typeorm';
import { RelationListEntity } from './entity.relation.list';
import { UserEntity } from './entity.user';

@Entity()
export class FriendListEntity extends RelationListEntity {
  @ManyToOne(() => UserEntity, (user) => user.friendList)
  user: UserEntity;
}
