import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './entity.user';

@Entity()
export class MatchHistoryEntity {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ type: 'boolean' })
  isRank: boolean;

  @Column({ type: 'integer' })
  winnerUid: number;

  @Column({ type: 'integer' })
  loserUid: number;

  @ManyToOne(() => UserEntity, (winner) => winner.winnerList)
  @JoinColumn({
    name: 'winnerUid',
    referencedColumnName: 'uid',
  })
  winner: UserEntity;

  @ManyToOne(() => UserEntity, (loser) => loser.loserList)
  @JoinColumn({
    name: 'loserUid',
    referencedColumnName: 'uid',
  })
  loser: UserEntity;
}
