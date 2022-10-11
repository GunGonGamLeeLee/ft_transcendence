import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

const MAX_CHANNEL_COUNT = 10; // ANCHOR 여기 있는게 맞나..?
const MAX_DM_SIZE = 200;

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

  async listDmOfUser(user1: number, user2: number) {
    if (user1 === user2)
      throw new HttpException('잘못된 요청입니다.', HttpStatus.BAD_REQUEST);
    return await this.dbDmLogsService.findDmLogsOfUser(user1, user2);
  }

  async addUser(userDto: UserDto) {
    return await this.dbUserService.saveOne(userDto);
  }

  async addFriend(myUid: number, friendUid: number) {
    // TODO transaction
    const user: UserEntity = await this.dbUserService.findOne(friendUid);
    if (user == null || myUid === friendUid)
      throw new HttpException('user not exist', HttpStatus.NOT_FOUND);
    await this.dbFriendListService.saveOne(
      { fromUid: myUid, toUid: friendUid },
      user,
    );
  }

  async addBlock(myUid: number, blockUid: number) {
    // TODO transaction
    const user: UserEntity = await this.dbUserService.findOne(blockUid);
    if (user == null || myUid === blockUid)
      throw new HttpException('user not exist', HttpStatus.NOT_FOUND);
    await this.dbBlockListService.saveOne(
      { fromUid: myUid, toUid: blockUid },
      user,
    );
  }

  async addChannel(channelDto: ChannelDto) {
    const count = await this.dbChannelService.countByUid(channelDto.chOwnerId);
    if (count >= MAX_CHANNEL_COUNT)
      throw new HttpException(
        'you have too many channels',
        HttpStatus.FORBIDDEN,
      );
    const user = await this.dbUserService.findOne(channelDto.chOwnerId);
    const channel = await this.dbChannelService.saveOne(channelDto, user);
    const userInChannelDto: UserInChannelDto = {
      uid: channelDto.chOwnerId,
      chid: channel.chid,
      userRole: UserRoleInChannel.OWNER,
      isMute: false,
      isBan: false,
    };
    this.dbUserInChannelService.saveOne(userInChannelDto, user, channel);
    return channel;
  }

  async addUerInChannel(userInChannelDto: UserInChannelDto) {
    const user: UserEntity = await this.dbUserService.findOne(
      userInChannelDto.uid,
    );
    const channel: ChannelEntity = await this.dbChannelService.findOne(
      userInChannelDto.chid,
    );
    userInChannelDto.userRole = UserRoleInChannel.USER;
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
    if (fromUser == null || toUser == null)
      throw new HttpException(
        '존재하지 않는 유저입니다.',
        HttpStatus.NOT_FOUND,
      );
    if (dmLog.content.length > MAX_DM_SIZE)
      throw new HttpException(
        '메시지의 내용이 너무 많습니다.',
        HttpStatus.PAYLOAD_TOO_LARGE,
      );
    if (fromUser.uid === toUser.uid)
      throw new HttpException('잘못된 요청입니다.', HttpStatus.FORBIDDEN);
    this.dbDmLogsService.saveOne(dmLog, fromUser, toUser);
  }

  async findOneUser(uid: number) {
    return await this.dbUserService.findOne(uid);
  }
  async findOneUserProfile(uid: number) {
    return await this.dbUserService.findOneProfile(uid);
  }

  async findOneChannel(chid: number) {
    return await this.dbChannelService.findOne(chid);
  }

  async saveOneUser(userDto: UserDto): Promise<void> {
    await this.dbUserService.saveOne(userDto);
  }

  async updateUserName(uid: number, displayName: string) {
    return this.dbUserService.updateName(uid, displayName);
  }
  async updateUserAvatar(uid: number, imgUri: string) {
    return this.dbUserService.updateimgUri(uid, imgUri);
  }
  async updateUserRating(uid: number, rating: number) {
    return this.dbUserService.updateRating(uid, rating);
  }
  async updateUserIsRequiredTFA(uid: number, isRequiredTFA: boolean) {
    return this.dbUserService.updateIsRequiredTFA(uid, isRequiredTFA);
  }

  async updateUserStatus(uid: number, status: UserStatus) {
    return this.dbUserService.updateUserStatus(uid, status);
  }

  async updateChName(uid: number, chid: number, chName: string) {
    await this.checkPermissionInChannel(
      uid,
      chid,
      'you can`t edit channel name.',
    );
    return this.dbChannelService.updateChName(chid, chName);
  }

  async updateChDisplay(uid: number, chid: number, display: boolean) {
    await this.checkPermissionInChannel(
      uid,
      chid,
      'you can`t edit channel display state.',
    );
    return this.dbChannelService.updateDisplay(chid, display);
  }

  async updateChRemovePassword(uid: number, chid: number) {
    await this.checkPermissionInChannel(
      uid,
      chid,
      'you can`t remove channel password.',
    );
    return this.dbChannelService.removePassword(chid);
  }

  async updateChSetPassword(uid: number, chid: number, password: string) {
    await this.checkPermissionInChannel(
      uid,
      chid,
      'you can`t set channel password.',
    );
    return this.dbChannelService.setPassword(chid, password);
  }

  async banUserInChannel(myUid: number, targetUid: number, chid: number) {
    await this.checkPermissionInChannel(
      myUid,
      chid,
      'you can`t ban user in channel.',
    );
    return this.dbUserInChannelService.banOne(targetUid, chid);
  }

  async muteUserInChannel(myUid: number, targetUid: number, chid: number) {
    await this.checkPermissionInChannel(
      myUid,
      chid,
      'you can`t mute user in channel.',
    );
    return this.dbUserInChannelService.muteOne(targetUid, chid);
  }

  async unbanUserInChannel(myUid: number, targetUid: number, chid: number) {
    await this.checkPermissionInChannel(
      myUid,
      chid,
      'you can`t unban user in channel.',
    );
    return this.dbUserInChannelService.unbanOne(targetUid, chid);
  }

  async unmuteUserInChannel(myUid: number, targetUid: number, chid: number) {
    await this.checkPermissionInChannel(
      myUid,
      chid,
      'you can`t unmute user in channel.',
    );
    return this.dbUserInChannelService.unmuteOne(targetUid, chid);
  }

  async changeUserRoleInChannel(
    myUid: number,
    targetUid: number,
    chid: number,
    role: UserRoleInChannel,
  ) {
    await this.checkPermissionInChannel(
      myUid,
      chid,
      'you can`t change userRole in channel.',
    );
    if (role == UserRoleInChannel.OWNER)
      throw new HttpException('권한이 없습니다.', HttpStatus.FORBIDDEN);
    if (role > UserRoleInChannel.USER || role < UserRoleInChannel.OWNER)
      throw new HttpException(
        '구현되지 않았습니다.',
        HttpStatus.NOT_IMPLEMENTED,
      );
    return this.dbUserInChannelService.changeRole(targetUid, chid, role);
  }

  async deleteChannel(uid: number, chid: number) {
    await this.checkPermissionInChannel(uid, chid, 'you can`t delete channel.');
    // TODO 관련 목록 정리
    await this.dbUserInChannelService.deleteAllOfChannel(chid);
    return await this.dbChannelService.deleteOne(chid); // TODO 접속해있는 유저들한테 삭제됐다고 정보가 가야하나? -> ㅇㅇ
  }

  async deleteFriendOfUser(myUid: number, friendUid: number) {
    return await this.dbFriendListService.deleteOne(myUid, friendUid);
  }

  async deleteFriendAll(uid: number) {
    return await this.dbFriendListService.deleteAll(uid);
  }

  async deleteBlockOfUser(myUid: number, blockUid: number) {
    return await this.dbBlockListService.deleteOne(myUid, blockUid);
  }

  async deleteBlockAll(uid: number) {
    return await this.dbBlockListService.deleteAll(uid);
  }

  async deleteUserInChannel(uid: number, chid: number) {
    const channel = await this.dbChannelService.findOne(chid);
    if (channel == null)
      throw new HttpException('없는 채널입니다.', HttpStatus.NOT_FOUND);
    console.log(typeof channel.chOwnerId);
    console.log(typeof uid);
    console.log(typeof uid);
    if (channel.chOwnerId === uid) this.deleteChannel(uid, chid);
    return await this.dbUserInChannelService.deleteOne(uid, chid);
  }

  private async checkPermissionInChannel(
    myUid: number,
    chid: number,
    msg: string,
  ) {
    const uic = await this.dbUserInChannelService.findOne(myUid, chid);
    if (uic == null) throw new HttpException(msg, HttpStatus.NOT_FOUND);
    if (uic.userRole == UserRoleInChannel.USER)
      throw new HttpException(msg, HttpStatus.FORBIDDEN);
  }
}
