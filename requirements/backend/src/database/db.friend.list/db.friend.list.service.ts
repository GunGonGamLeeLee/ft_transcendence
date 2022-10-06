import { Injectable } from '@nestjs/common';
import { FriendListEntity } from '../entity/entity.friend.list';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelationListDto } from '../dto/relation.list.dto';
import { UserEntity } from '../entity/entity.user';

@Injectable()
export class DbFriendListService {
  constructor(
    @InjectRepository(FriendListEntity)
    private firendListRepo: Repository<FriendListEntity>,
  ) {}

  async saveOne(
    friendRelation: RelationListDto,
    user: UserEntity,
  ): Promise<void> {
    const rel = new FriendListEntity();
    rel.fuid = friendRelation.fuid;
    rel.tuid = friendRelation.tuid;
    rel.user = user;
    await this.firendListRepo.save(rel);
  }
}
