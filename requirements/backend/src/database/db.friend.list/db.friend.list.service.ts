import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelationListDto } from '../dto/relation.list.dto';
import { UserEntity } from '../entity/entity.user';
import { FriendListEntity } from '../entity/entity.friend.list';

@Injectable()
export class DbFriendListService {
  constructor(
    @InjectRepository(FriendListEntity)
    private firendListRepo: Repository<FriendListEntity>,
  ) {}

  async findAll() {
    return await this.firendListRepo.find();
  }

  async findListOfUser(uid: number) {
    const user = await this.firendListRepo.find({
      where: { fromUid: uid },
    });
    return user;
  }

  async findListOfUserWithInfo(uid: number) {
    const user = await this.firendListRepo.find({
      select: {
        index: true,
        friend: {
          uid: true,
          displayName: true,
          imgUri: true,
          status: true,
          rating: true,
        },
      },
      relations: {
        friend: true,
      },
      where: { fromUid: uid },
    });
    return user;
  }

  async findFollwerOfUser(uid: number) {
    const user = await this.firendListRepo.find({
      where: { toUid: uid },
    });
    return user;
  }

  async findFollwerOfUserWithInfo(uid: number) {
    const user = await this.firendListRepo.find({
      select: {
        index: true,
        follower: {
          uid: true,
          displayName: true,
          imgUri: true,
          status: true,
          rating: true,
        },
      },
      relations: {
        follower: true,
      },
      where: { toUid: uid },
    });
    return user;
  }

  async saveOne(
    friendRelation: RelationListDto,
    user: UserEntity,
  ): Promise<void> {
    const rel = this.firendListRepo.create({ ...friendRelation, friend: user });
    try {
      await this.firendListRepo.save(rel);
    } catch (err) {
      throw new HttpException('already friend!', HttpStatus.FORBIDDEN);
    }
  }

  async deleteOne(fromUid: number, toUid: number) {
    return await this.firendListRepo.delete({
      fromUid,
      toUid,
    });
  }

  async deleteAll(uid: number) {
    await this.firendListRepo.delete({ fromUid: uid });
    await this.firendListRepo.delete({ toUid: uid });
  }
}
