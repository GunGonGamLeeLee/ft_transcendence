import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RelationListEntity } from './entity.relation.list';
import { UserEntity } from './entity.user';

@Entity()
export class BlockListEntity extends RelationListEntity {
  @ManyToOne(() => UserEntity, (user) => user.blockList)
  @JoinColumn({
    name: 'toUid',
    referencedColumnName: 'uid',
  })
  user: UserEntity;
}
