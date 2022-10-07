import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RelationListEntity {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ type: 'integer' })
  fromUid: number;

  @Column({ type: 'integer' })
  toUid: number;
}
