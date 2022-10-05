import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity.user';

@Injectable()
export class DbUserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findOneById(id: number): Promise<UserEntity> {
    return await this.userRepo.findOneBy({ uid: id });
  }

  async saveOne(user: UserEntity): Promise<void> {
    await this.userRepo.save(user);
  }
}
