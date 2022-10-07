import { Injectable } from '@nestjs/common';
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

  async findOneByIdInFriendList(id: number) {
    const user = await this.firendListRepo.findOne({
      where: { fuid: id },
    });
    return user;
  }
}
