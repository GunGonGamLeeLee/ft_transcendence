import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/entity.user';
import { BlockListEntity } from '../entity/entity.block.list';
import { RelationListDto } from '../dto/relation.list.dto';

@Injectable()
export class DbBlockListService {
  constructor(
    @InjectRepository(BlockListEntity)
    private blockListRepo: Repository<BlockListEntity>,
  ) {}

  async findAll() {
    return await this.blockListRepo.find();
  }

  async saveOne(
    blockRelation: RelationListDto,
    user: UserEntity,
  ): Promise<void> {
    const rel = new BlockListEntity();
    rel.fromUid = blockRelation.fromUid;
    rel.toUid = blockRelation.toUid;
    rel.user = user;
    await this.blockListRepo.save(rel);
  }

  async deleteOne(fromUid: number, toUid: number) {
    await this.blockListRepo.delete({
      fromUid,
      toUid,
    });
  }

  async findListOfUser(uid: number) {
    const user = await this.blockListRepo.find({
      where: { fromUid: uid },
    });
    return user;
  }

  async findListOfUserWithInfo(uid: number) {
    const user = await this.blockListRepo.find({
      select: {
        index: true,
        user: {
          uid: true,
          displayName: true,
          avatarPath: true,
          userStatus: true,
        },
      },
      relations: {
        user: true,
      },
      where: { fromUid: uid },
    });
    return user;
  }
}
