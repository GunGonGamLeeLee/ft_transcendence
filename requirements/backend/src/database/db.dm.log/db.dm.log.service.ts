import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  // async findDmLogsOfUser(uid: number) {
  //   const sentMsg = await this.dmLogRepo.findBy({ fromUid: uid });
  //   const recvMsg = await this.dmLogRepo.findBy({ toUid: uid });
  //   return sentMsg.concat(recvMsg);
  // }

  async findDmLogsOfUser(fromUid: number, toUid: number) {
    const Msg = await this.dmLogRepo.find({
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
        }
      ]
    })

    return Msg;


    // const sentMsg = await this.dmLogRepo.find({
    //   where: { fromUid: uid },
    // });
    // const recvMsg = await this.dmLogRepo.find({
    //   where: { toUid: uid },
    // });
    // return sentMsg.concat(recvMsg);
  }

  // async findOneWithUsersById(chid: number) {
  //   return await this.dmLogRepo.findOne({
  //     relations: {
  //       usersInChannel: true,
  //     },
  //     where: { chid },
  //   });
  // }
 
  async saveOne(
    directMessage: DmLogDto | DmLogEntity,
    fromUser: UserEntity,
    toUser: UserEntity,
  ) {
    const dm = await this.dmLogRepo.create({
      time: directMessage.time,
      content: directMessage.content,
      fromUser,
      toUser,
    });
    try {
      await this.dmLogRepo.save(dm);
    } catch (error) {
      throw new InternalServerErrorException('server error');
    }
  }

  // async deleteOne(chid: number) {
  //   await this.dmLogRepo.delete({ chid });
  // }
}
