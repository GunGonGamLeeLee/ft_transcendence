import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['fromUid', 'toUid'])
export class RelationListEntity {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ type: 'integer' })
  fromUid: number;

  @Column({ type: 'integer' })
  toUid: number;
}
