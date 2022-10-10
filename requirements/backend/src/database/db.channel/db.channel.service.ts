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
