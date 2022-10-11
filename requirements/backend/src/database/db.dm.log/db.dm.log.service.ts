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
        index: true,
        content: true,
        time: true,
        fromUser: {
          uid: true,
          displayName: true,
          imgUri: true,
          status: true,
        },
        toUser: {
          uid: true,
          displayName: true,
          imgUri: true,
          status: true,
        },
      },
      relations: {
        fromUser: true,
        toUser: true,
      },
      where: [
        {
          fromUser: { uid: Equal(fromUid) },
          toUser: { uid: Equal(toUid) },
        },
        {
          fromUser: { uid: Equal(toUid) },
          toUser: { uid: Equal(fromUid) },
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
}
