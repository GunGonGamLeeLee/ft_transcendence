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
    rel.fuid = blockRelation.fuid;
    rel.tuid = blockRelation.tuid;
    rel.user = user;
    await this.blockListRepo.save(rel);
  }

  async findOneByIdInBlockList(id: number) {
    const user = await this.blockListRepo.findOne({
      where: { fuid: id },
    });
    return user;
  }
}
