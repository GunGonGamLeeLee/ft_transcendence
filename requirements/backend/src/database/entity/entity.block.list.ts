import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './entity.user';

@Entity()
export class BlockListEntity {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ type: 'integer' })
  fuid: number;

  @Column({ type: 'integer' })
  tuid: number;

  @ManyToOne(() => UserEntity, (user) => user.blockList)
  user: UserEntity;
}
