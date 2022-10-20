import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelDto } from '../dto/channel.dto';
import { ChannelEntity, ChannelMode } from '../entity/entity.channel';
import { UserEntity } from '../entity/entity.user';
import * as bcrypt from 'bcrypt';
import { ChannelUpdateDto } from 'src/chat/dto/channel.update.dto';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class DbChannelService {
  constructor(
    @InjectRepository(ChannelEntity)
    private channelRepo: Repository<ChannelEntity>,
  ) {}

  async findAll() {
    return await this.channelRepo.find();
  }

  async findAllPubPro() {
    return await this.channelRepo.find({
      select: {
        chid: true,
        chName: true,
        chOwner: {
          uid: true,
          displayName: true,
        },
        mode: true,
      },
      relations: {
        chOwner: true,
      },
      where: [{ mode: ChannelMode.public }, { mode: ChannelMode.protected }],
    });
  }

  async findOne(chid: number) {
    return await this.channelRepo.findOne({
      where: { chid },
    });
  }

  async findOneByOwnerId(chOwnerId: number) {
    return await this.channelRepo.findOne({
      where: { chOwnerId, mode: ChannelMode.dm },
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
    if (channel.password !== '')
      channel.password = await this.encryptedPassword(channel.password);
    const ch = this.channelRepo.create({ ...channel, chOwner });
    return await this.channelRepo.save(ch);
  }

  async updateChannel(body: ChannelUpdateDto): Promise<ChannelEntity> {
    const channel = await this.findOne(body.chid);
    channel.chName = body.chName;
    channel.mode = body.mode;
    if (body.password !== '') {
      channel.password = await this.encryptedPassword(body.password);
    }
    try {
      await this.channelRepo.update({ chid: body.chid }, channel);
    } catch (err) {
      throw new WsException('update channel error');
    }
    return channel;
  }

  async updateChName(chid: number, chName: string) {
    return await this.channelRepo.update({ chid }, { chName });
  }

  async updateDisplay(chid: number, mode: ChannelMode, password: string) {
    if (mode === ChannelMode.protected) this.setPassword(chid, password);

    const data = await this.channelRepo.save({ chid, mode });

    return data;
  }

  async setPassword(chid: number, password: string) {
    if (password.length !== 4 && password.length !== 0)
      throw new HttpException(
        '비밀번호는 4글자이어야 합니다.',
        HttpStatus.FORBIDDEN,
      );
    password = await this.encryptedPassword(password);
    return await this.channelRepo.update(
      { chid },
      { mode: ChannelMode.protected, password },
    );
  }

  async removePassword(chid: number) {
    return await this.channelRepo.update(
      { chid },
      { mode: ChannelMode.public, password: '' },
    );
  }

  async deleteOne(chid: number) {
    await this.channelRepo.delete({ chid });
  }

  private async encryptedPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
