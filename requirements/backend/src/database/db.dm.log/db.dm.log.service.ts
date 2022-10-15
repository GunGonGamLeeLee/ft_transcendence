import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { DmLogDto } from '../dto/dm.log.dto';
import { DmLogEntity } from '../entity/entity.dm.log';
import { UserEntity } from '../entity/entity.user';

@Injectable()
export class DbDmLogService {
  constructor(
    @InjectRepository(DmLogEntity)
    private dmLogRepo: Repository<DmLogEntity>,
  ) {}

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
    });
    return msg;
  }

  async saveOne(
    directMessage: DmLogDto | DmLogEntity,
    fromUser: UserEntity,
    toUser: UserEntity,
  ) {
    const dm = await this.dmLogRepo.create({
      ...directMessage,
      fromUser,
      toUser,
    });
    try {
      await this.dmLogRepo.save(dm);
    } catch (error) {
      throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUserAll(uid: number) {
    await this.dmLogRepo.delete({ fromUser: { uid: Equal(uid) } });
    await this.dmLogRepo.delete({ toUser: { uid: Equal(uid) } });
  }
}
