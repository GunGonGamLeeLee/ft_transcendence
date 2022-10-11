import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelDto } from '../dto/channel.dto';
import { ChannelEntity } from '../entity/entity.channel';
import { UserEntity } from '../entity/entity.user';

@Injectable()
export class DbChannelService {
  constructor(
    @InjectRepository(ChannelEntity)
    private channelRepo: Repository<ChannelEntity>,
  ) {}

  async findAll() {
    return await this.channelRepo.find();
  }

  async findOne(chid: number) {
    return await this.channelRepo.findOne({
      select: {
        chOwner: {
          uid: true,
          displayName: true,
        },
      },
      relations: {
        chOwner: true,
      },
      where: { chid },
    });
  }

  async findOneWithUsers(chid: number) {
    return await this.channelRepo.findOne({
      relations: {
        usersInChannel: true,
      },
      where: { chid },
    });
  }

  async countByUid(chOwnerId: number) {
    return await this.channelRepo.countBy({ chOwnerId });
  }

  async saveOne(channel: ChannelDto | ChannelEntity, chOwner: UserEntity) {
    const ch = this.channelRepo.create({ ...channel, chOwner });
    return await this.channelRepo.save(ch);
  }

  async updateChName(chid: number, chName: string) {
    return await this.channelRepo.update({ chid }, { chName });
  }

  async updateDisplay(chid: number, display: boolean) {
    return await this.channelRepo.update({ chid }, { display });
  }

  async setPassword(chid: number, password: string) {
    return await this.channelRepo.update(
      { chid },
      { isLocked: true, password },
    );
  }

  async removePassword(chid: number) {
    return await this.channelRepo.update(
      { chid },
      { isLocked: false, password: '' },
    );
  }

  async deleteOne(chid: number) {
    await this.channelRepo.delete({ chid });
  }
}
