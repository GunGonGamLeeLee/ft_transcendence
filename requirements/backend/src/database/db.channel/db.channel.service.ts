import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelDto } from '../dto/channel.dto';
import { ChannelEntity } from '../entity/entity.channel';

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
    return await this.channelRepo.findOneBy({ chid });
  }

  async findOneWithUsers(chid: number) {
    return await this.channelRepo.findOne({
      relations: {
        usersInChannel: true,
      },
      where: { chid },
    });
  }

  async saveOne(channel: ChannelDto | ChannelEntity) {
    const ch = new ChannelEntity();
    ch.chName = channel.chName;
    ch.chOwnerId = channel.chOwnerId;
    ch.display = channel.display;
    ch.isLocked = channel.isLocked;
    ch.password = channel.password;
    return await this.channelRepo.save(ch);
  }

  async deleteOne(chid: number) {
    await this.channelRepo.delete({ chid });
  }
}
