import { Injectable } from '@nestjs/common';
import { DbBlockListService } from './db.block.list/db.block.list.service';
import { DbChannelService } from './db.channel/db.channel.service';
import { DbDmLogService } from './db.dm.log/db.dm.log.service';
import { DbFriendListService } from './db.friend.list/db.friend.list.service';
import { DbUserInChannelService } from './db.user.in.channel/db.user.in.channel.service';
import { DbUserService } from './db.user/db.user.service';
import { ChannelDto } from './dto/channel.dto';
import { DmLogDto } from './dto/dm.log.dto';
import { UserDto } from './dto/user.dto';
import { UserInChannelDto } from './dto/user.in.channel.dto';
import { ChannelEntity } from './entity/entity.channel';
import { UserEntity, UserStatus } from './entity/entity.user';
import { UserRoleInChannel } from './entity/entity.user.in.channel';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly dbUserService: DbUserService,
    private readonly dbFriendListService: DbFriendListService,
    private readonly dbBlockListService: DbBlockListService,
    private readonly dbDmLogsService: DbDmLogService,
    private readonly dbChannelService: DbChannelService,
    private readonly dbUserInChannelService: DbUserInChannelService,
  ) {}

  async listAllUser() {
    return await this.dbUserService.findAll();
  }

  async listAllFriend() {
    return await this.dbFriendListService.findAll();
  }

  async listAllBlock() {
    return await this.dbBlockListService.findAll();
  }

  async listAllChannel() {
    return await this.dbChannelService.findAll();
  }

  async listAllUserInChannel() {
    return await this.dbUserInChannelService.findAll();
  }

  async listAllDmLogs() {
    return await this.dbDmLogsService.findAll();
  }

  async listUserFriend(uid: number) {
    return await this.dbFriendListService.findListOfUser(uid);
  }

  async listUserFriendWithInfo(uid: number) {
    return await this.dbFriendListService.findListOfUserWithInfo(uid);
  }

  async listUserBlock(uid: number) {
    return await this.dbBlockListService.findListOfUser(uid);
  }

  async listUserBlockWithInfo(uid: number) {
    return await this.dbBlockListService.findListOfUserWithInfo(uid);
  }

  async listUserInChannel(chid: number) {
    return await this.dbUserInChannelService.findUsersInChannel(chid);
  }

  async listUserInChannelWithUserInfo(chid: number) {
    return await this.dbUserInChannelService.findUsersInChannelWithUserInfo(
      chid,
    );
  }

  async listChannelOfUser(uid: number) {
    return await this.dbUserInChannelService.findChannelsOfUser(uid);
  }

  async listChannelOfUserWithChannelInfo(uid: number) {
    return await this.dbUserInChannelService.findChannelsOfUserWithChannelInfo(
      uid,
    );
  }

  async listMuteUserInChannelWithUserInfo(chid: number) {
    return await this.dbUserInChannelService.findMuteUsersInChannelWithUserInfo(
      chid,
    );
  }
  async listBanUserInChannelWithUserInfo(chid: number) {
    return await this.dbUserInChannelService.findBanUsersInChannelWithUserInfo(
      chid,
    );
  }

  async listDmOfUser(uid: number) {
    return await this.dbDmLogsService.findDmLogsOfUser(uid);
  }

  async listDmOfUserWithUserInfo(uid: number) {
    return await this.dbDmLogsService.findDmLogsOfUserWithUserInfo(uid);
  }

  async getBanListofChannel(chid: number) {
    return await this.dbUserInChannelService.findBanListOfChannel(chid);
  }

  async addUser(userDto: UserDto) {
    return await this.dbUserService.saveOne(userDto);
  }

  async addFriend(myUid: number, friendUid: number) {
    // TODO 차단 삭제
    const user: UserEntity = await this.dbUserService.findOne(friendUid);
    this.dbFriendListService.saveOne(
      { fromUid: +myUid, toUid: +friendUid },
      user,
    );
  }

  async addBlock(myUid: number, blockUid: number) {
    // TODO 친구 삭제
    const user: UserEntity = await this.dbUserService.findOne(blockUid);
    this.dbBlockListService.saveOne(
      { fromUid: +myUid, toUid: +blockUid },
      user,
    );
  }

  async addChannel(channelDto: ChannelDto) {
    return await this.dbChannelService.saveOne(channelDto);
  }

  async addUerInChannel(userInChannelDto: UserInChannelDto) {
    const user: UserEntity = await this.dbUserService.findOne(
      userInChannelDto.uid,
    );
    const channel: ChannelEntity = await this.dbChannelService.findOne(
      userInChannelDto.chid,
    );
    return await this.dbUserInChannelService.saveOne(
      userInChannelDto,
      user,
      channel,
    );
  }

  async addDmLog(dmLog: DmLogDto) {
    const fromUser: UserEntity = await this.dbUserService.findOne(
      dmLog.fromUid,
    );
    const toUser: UserEntity = await this.dbUserService.findOne(dmLog.toUid);
    this.dbDmLogsService.saveOne(dmLog, fromUser, toUser);
  }

  async findOneUser(uid: number) {
    return await this.dbUserService.findOne(uid);
  }

  async findOneChannel(chid: number) {
    return await this.dbChannelService.findOne(chid);
  }

  async saveOneUser(userDto: UserDto | UserEntity): Promise<void> {
    await this.dbUserService.saveOne(userDto);
  }

  async updateNameOfUser(uid: number, displayName: string) {
    return this.dbUserService.updateName(uid, displayName);
  }
  async updateAvatarOfUser(uid: number, avatarPath: string) {
    return this.dbUserService.updateAvatarPath(uid, avatarPath);
  }
  async updateRatingOfUser(uid: number, rating: number) {
    return this.dbUserService.updateRating(uid, rating);
  }
  async updateIsRequiredTFAOfUser(uid: number, isRequiredTFA: boolean) {
    return this.dbUserService.updateIsRequiredTFA(uid, isRequiredTFA);
  }

  async updateUserStatusOfUser(uid: number, userStatus: UserStatus) {
    return this.dbUserService.updateUserStatus(uid, userStatus);
  }

  async banUserInChannel(uid: number, chid: number) {
    return this.dbUserInChannelService.banOne(uid, chid);
  }

  async muteUserInChannel(uid: number, chid: number) {
    return this.dbUserInChannelService.muteOne(uid, chid);
  }

  async unbanUserInChannel(uid: number, chid: number) {
    return this.dbUserInChannelService.unbanOne(uid, chid);
  }

  async unmuteUserInChannel(uid: number, chid: number) {
    return this.dbUserInChannelService.unmuteOne(uid, chid);
  }

  async changeUserRoleInChannel(
    uid: number,
    chid: number,
    role: UserRoleInChannel,
  ) {
    // TODO 유저 역할: 채널 주인으로 바꿀 수 있어야하나? 안되야 맞는 듯
    return this.dbUserInChannelService.changeRole(uid, chid, role);
  }

  async deleteUser(uid: number) {
    await this.dbUserService.deleteOne(uid);
  }

  async deleteFriendOfUser(myUid: number, friendUid: number) {
    await this.dbFriendListService.deleteOne(myUid, friendUid);
  }

  async deleteBlockOfUser(myUid: number, blockUid: number) {
    await this.dbBlockListService.deleteOne(myUid, blockUid);
  }

  async deleteUserInChannel(uid: number, chid: number) {
    const channel = await this.dbChannelService.findOne(chid);
    if (channel.chOwnerId == uid) this.dbChannelService.deleteOne(chid);
    await this.dbUserInChannelService.deleteOne(uid, chid);
  }
}
