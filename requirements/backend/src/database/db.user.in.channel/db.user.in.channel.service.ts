import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInChannelDto } from '../dto/user.in.channel.dto';
import { ChannelEntity } from '../entity/entity.channel';
import { UserEntity } from '../entity/entity.user';
import {
  UserInChannelEntity,
  UserRoleInChannel,
} from '../entity/entity.user.in.channel';

@Injectable()
export class DbUserInChannelService {
  constructor(
    @InjectRepository(UserInChannelEntity)
    private userInChannelRepo: Repository<UserInChannelEntity>,
  ) {}

  async findAll() {
    return await this.userInChannelRepo.find();
  }

  async findOne(uid: number, chid: number) {
    return await this.userInChannelRepo.findOneBy({ uid, chid });
  }

  async findUsersInChannel(chid: number) {
    return await this.userInChannelRepo.findBy({ chid });
  }

  async findUsersInChannelWithUserInfo(chid: number) {
    return await this.userInChannelRepo.find({
      select: {
        userRole: true,
        user: {
          uid: true,
          displayName: true,
          imgUri: true,
        },
      },
      relations: { user: true },
      where: { chid },
    });
  }

  async findMuteUsersInChannelWithUserInfo(chid: number) {
    return await this.userInChannelRepo.find({
      select: {
        userRole: true,
        user: {
          uid: true,
          displayName: true,
          imgUri: true,
        },
      },
      relations: { user: true },
      where: { chid, isMute: true },
    });
  }

  async findBanUsersInChannelWithUserInfo(chid: number) {
    return await this.userInChannelRepo.find({
      select: {
        userRole: true,
        user: {
          uid: true,
          displayName: true,
          imgUri: true,
        },
      },
      relations: { user: true },
      where: { chid, isBan: true },
    });
  }

  async findChannelsOfUser(uid: number) {
    return await this.userInChannelRepo.findBy({ uid });
  }

  async findChannelsOfUserWithChannelInfo(uid: number) {
    return await this.userInChannelRepo.find({
      select: {
        index: true,
        channel: {
          chName: true,
          display: true,
          isLocked: true,
        },
      },
      relations: {
        channel: true,
      },
      where: { uid },
    });
  }

  async saveOne(
    userInChannel: UserInChannelDto | UserInChannelEntity,
    user: UserEntity,
    channel: ChannelEntity,
  ) {
    const uic = this.userInChannelRepo.create({
      ...userInChannel,
      user,
      channel,
    });
    try {
      return await this.userInChannelRepo.save(uic);
    } catch (err) {
      throw new HttpException(
        '채널에 들어갈 수 없습니다.',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async muteOne(uid: number, chid: number) {
    return await this.userInChannelRepo.update({ uid, chid }, { isMute: true });
  }

  async banOne(uid: number, chid: number) {
    return await this.userInChannelRepo.update({ uid, chid }, { isBan: true });
  }

  async unmuteOne(uid: number, chid: number) {
    return await this.userInChannelRepo.update(
      { uid, chid },
      { isMute: false },
    );
  }

  async unbanOne(uid: number, chid: number) {
    return await this.userInChannelRepo.update({ uid, chid }, { isBan: false });
  }

  async changeRole(uid: number, chid: number, role: UserRoleInChannel) {
    return await this.userInChannelRepo.update(
      { uid, chid },
      { userRole: role },
    );
  }

  async deleteOne(uid: number, chid: number) {
    return await this.userInChannelRepo.delete({ uid, chid });
  }

  async deleteAllOfUser(uid: number) {
    return await this.userInChannelRepo.delete({ uid });
  }

  async deleteAllOfChannel(chid: number) {
    return await this.userInChannelRepo.delete({ chid });
  }
}
