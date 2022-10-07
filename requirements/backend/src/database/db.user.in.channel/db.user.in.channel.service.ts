import { Injectable } from '@nestjs/common';
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
          avatarPath: true,
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
          avatarPath: true,
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
          avatarPath: true,
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

  async findBanListOfChannel(chid: number) {
    return await this.userInChannelRepo.find({
      select: {
        uid: true,
        user: {
          uid: true,
          displayName: true,
          avatarPath: true,
        },
      },
      relations: { user: true },
      where: {
        chid,
        isBan: true,
      },
    });
  }

  async saveOne(
    userInChannel: UserInChannelDto | UserInChannelEntity,
    user: UserEntity,
    channel: ChannelEntity,
  ) {
    const uic = new UserInChannelEntity();
    uic.chid = userInChannel.chid;
    uic.uid = userInChannel.uid;
    uic.userRole = userInChannel.userRole;
    uic.isMute = userInChannel.isMute;
    uic.isBan = userInChannel.isBan;
    uic.user = user;
    uic.channel = channel;
    return await this.userInChannelRepo.save(uic);
  }

  async deleteOne(uid: number, chid: number) {
    await this.userInChannelRepo.delete({ uid, chid });
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
}
