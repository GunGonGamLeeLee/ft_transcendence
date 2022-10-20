import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, QueryRunner, Repository } from 'typeorm';
import { DmLogDto } from '../dto/dm.log.dto';
import { DmLogEntity } from '../entity/entity.dm.log';
import { UserEntity } from '../entity/entity.user';

@Injectable()
export class DbDmLogService {
  constructor(
    @InjectRepository(DmLogEntity)
    private dmLogRepo: Repository<DmLogEntity>,
  ) {}

  private maximumLog = 100;

  async findAll() {
    return await this.dmLogRepo.find();
  }

  async findDmLogsOfUser(fromUid: number, toUid: number) {
    const msg = await this.dmLogRepo.find({
      select: {
        fromUid: true,
        toUid: true,
        msg: true,
        time: true,
      },
      where: [
        {
          fromUid,
          toUid,
        },
        {
          fromUid: toUid,
          toUid: fromUid,
        },
      ],
      order: {
        index: 'asc',
      },
    });
    return msg;
  }

  async saveOne(
    queryRunner: QueryRunner,
    directMessage: DmLogDto | DmLogEntity,
    fromUser: UserEntity,
    toUser: UserEntity,
  ) {
    const dm = this.dmLogRepo.create({
      ...directMessage,
      fromUser,
      toUser,
    });
    try {
      await queryRunner.manager.save(DmLogEntity, dm);
      if ((await this.dmLogRepo.count()) > this.maximumLog)
        await this.deleteExceeded(queryRunner);
    } catch (error) {
      throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUserAll(uid: number) {
    await this.dmLogRepo.delete({ fromUser: { uid: Equal(uid) } });
    await this.dmLogRepo.delete({ toUser: { uid: Equal(uid) } });
  }

  private async deleteExceeded(queryRunner: QueryRunner) {
    const results = await this.dmLogRepo.find({
      select: {
        index: true,
      },
      order: {
        index: 'desc',
      },
      skip: this.maximumLog,
    });
    for (const ret of results) {
      await queryRunner.manager.delete(DmLogEntity, { index: ret.index });
    }
  }
}
