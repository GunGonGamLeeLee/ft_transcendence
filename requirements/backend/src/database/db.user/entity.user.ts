import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @Column()
  avatarPath: string;

  @Column()
  rating: number;

  @Column({ default: false })
  isTwoStep: boolean;

  @Column()
  secret: string;
}
