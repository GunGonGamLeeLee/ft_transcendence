import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async saveOne(
    blockRelation: RelationListDto,
    user: UserEntity,
  ): Promise<void> {
    const rel = this.blockListRepo.create({ ...blockRelation, user });
    try {
      await this.blockListRepo.save(rel);
    } catch (err) {
      throw new HttpException('already blocked!', HttpStatus.FORBIDDEN); // FIXME 왜 에러 코드로 응답이 안 갈까?
    }
  }

  async deleteOne(fromUid: number, toUid: number) {
    return await this.blockListRepo.delete({
      fromUid,
      toUid,
    });
  }

  async deleteAll(uid: number) {
    return await this.blockListRepo.delete({ fromUid: uid });
  }
}
