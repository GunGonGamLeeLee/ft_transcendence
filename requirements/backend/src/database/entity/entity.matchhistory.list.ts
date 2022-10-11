// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { UserEntity } from './entity.user';

// @Entity()
// export class MatchHistoryEntity {
//   @PrimaryGeneratedColumn()
//   index: number;

//   @Column({ type: 'integer' })
//   player1uid: number;

//   @Column({ type: 'integer' })
//   player2uid: number;

//   @Column({ type: 'boolean' })
//   isPlayer1Win: boolean;

//   @ManyToOne(() => UserEntity, (user) => user.matchHistory)
//   user: UserEntity;
// }