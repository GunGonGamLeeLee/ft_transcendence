import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlockList {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ type: 'integer' })
  fuid: number;

  @Column({ type: 'integer' })
  tuid: number;
}
