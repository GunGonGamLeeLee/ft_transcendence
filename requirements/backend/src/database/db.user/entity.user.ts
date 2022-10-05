import { Entity, Column, PrimaryColumn } from 'typeorm';

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
  isTwoStep: boolean;

  @Column()
  qrSecret: string;
}
