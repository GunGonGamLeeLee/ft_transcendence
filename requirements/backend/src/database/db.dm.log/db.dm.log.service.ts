import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findDmLogsOfUser(uid: number) {
    const sentMsg = await this.dmLogRepo.findBy({ fromUid: uid });
    const recvMsg = await this.dmLogRepo.findBy({ toUid: uid });
    return sentMsg.concat(recvMsg);
  }

  async findDmLogsOfUserWithUserInfo(uid: number) {
    const sentMsg = await this.dmLogRepo.find({
      relations: { users: true },
      where: { fromUid: uid },
    });
    const recvMsg = await this.dmLogRepo.find({
      relations: { users: true },
      where: { toUid: uid },
    });
    return sentMsg.concat(recvMsg);
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
    const dm = new DmLogEntity();
    dm.fromUid = directMessage.fromUid;
    dm.toUid = directMessage.toUid;
    dm.content = directMessage.content;
    dm.time = directMessage.time;
    dm.users.push(fromUser);
    dm.users.push(toUser);
    this.dmLogRepo.save(dm);
  }

  // async deleteOne(chid: number) {
  //   await this.dmLogRepo.delete({ chid });
  // }
}
