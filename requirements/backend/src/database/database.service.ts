import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfileUpdateDto } from 'src/users/dto/profile.update.dto';
import { DbBlockListService } from './db.block.list/db.block.list.service';
import { DbChannelService } from './db.channel/db.channel.service';
import { DbDmLogService } from './db.dm.log/db.dm.log.service';
import { DbFriendListService } from './db.friend.list/db.friend.list.service';
import { DbMatchHistoryService } from './db.match.history/db.match.history.service';
import { DbUserInChannelService } from './db.user.in.channel/db.user.in.channel.service';
import { DbUserService } from './db.user/db.user.service';
import { ChannelDto } from './dto/channel.dto';
import { DmLogDto } from './dto/dm.log.dto';
import { MatchHistoryDto } from './dto/match.history.dto';
import { UserDto } from './dto/user.dto';
import { UserInChannelDto } from './dto/user.in.channel.dto';
import { ChannelEntity, ChannelMode } from './entity/entity.channel';
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
    private readonly dbMatchHistoryService: DbMatchHistoryService,
  ) {}

  // NOTE list
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

  async listAllChannelPubPro() {
    return await this.dbChannelService.findAllPubPro();
  }

  async listAllUserInChannel() {
    return await this.dbUserInChannelService.findAll();
  }

  async listAllDmLogs() {
    return await this.dbDmLogsService.findAll();
  }

  async listAllMatchHistory() {
    return await this.dbMatchHistoryService.findAll();
  }

  async listUserDmChannel(uid: number) {
    return await this.dbUserInChannelService.findDmChannelsOfUserWithChannelInfo(
      uid,
    );
  }

  async listUserFriend(uid: number) {
    return await this.dbFriendListService.findListOfUser(uid);
  }

  async listUserFriendWithInfo(uid: number) {
    return await this.dbFriendListService.findListOfUserWithInfo(uid);
  }

  async listUserFollower(uid: number) {
    return await this.dbFriendListService.findFollwerOfUser(uid);
  }

  async listUserFollowerWithInfo(uid: number) {
    return await this.dbFriendListService.findFollwerOfUserWithInfo(uid);
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

  async CountUserInChannel(chid: number) {
    return await this.dbUserInChannelService.CountUsersInChannel(chid);
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

  async listMuteUserInChannel(chid: number) {
    return await this.dbUserInChannelService.findMuteUsersInChannel(chid);
  }
  async listBanUserInChannel(chid: number) {
    return await this.dbUserInChannelService.findBanUsersInChannel(chid);
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

  async listUserRank() {
    return await this.dbUserService.findUserRankList();
  }

  async listMatchHistoryOfUser(uid: number, take: number, page: number) {
    if (page < 1)
      throw new HttpException(
        'page must not be 0 or negative',
        HttpStatus.BAD_REQUEST,
      );
    return await this.dbMatchHistoryService.findListOfUser(uid, take, page);
  }

  async listMatchHistoryOfUserWithUserInfo(
    uid: number,
    take: number,
    page: number,
  ) {
    if (page < 1)
      throw new HttpException(
        'page must not be 0 or negative',
        HttpStatus.BAD_REQUEST,
      );
    return await this.dbMatchHistoryService.findListOfUserWithInfo(
      uid,
      take,
      page,
    );
  }

  async listAllMatchHistoryOfUser(uid: number) {
    return await this.dbMatchHistoryService.findAllListOfUser(uid);
  }

  async listAllMatchHistoryOfUserWithUserInfo(uid: number) {
    return await this.dbMatchHistoryService.findAllListOfUserWithInfo(uid);
  }

  async updateUser(uid: number, userDto: ProfileUpdateDto) {
    return await this.dbUserService.updateUser(uid, userDto);
  }

  // NOTE add

  async addUser(userDto: UserDto): Promise<void> {
    // TODO transaction
    const user = await this.dbUserService.saveOne(userDto);
    await this.dbChannelService.saveOne(
      {
        chName: `dm${user.uid}`,
        chOwnerId: user.uid,
        mode: ChannelMode.dm,
        password: '',
      },
      user,
    );
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
    return await this.dbUserService.findOneProfile(friendUid);
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

  async addMatchHistory(matchHistory: MatchHistoryDto) {
    // 자기 자신과 경기 할 수 없음
    if (matchHistory.winnerUid === matchHistory.loserUid)
      throw new HttpException('invalid game history', HttpStatus.FORBIDDEN);

    const winner: UserEntity = await this.dbUserService.findOne(
      matchHistory.winnerUid,
    );
    const loser: UserEntity = await this.dbUserService.findOne(
      matchHistory.loserUid,
    );
    return await this.dbMatchHistoryService.saveOne(
      matchHistory,
      winner,
      loser,
    );
  }

  // NOTE find
  async findOneUser(uid: number) {
    return await this.dbUserService.findOne(uid);
  }
  async findOneUserProfile(uid: number) {
    return await this.dbUserService.findOneProfile(uid);
  }

  async findOneChannel(chid: number) {
    return await this.dbChannelService.findOne(chid);
  }

  async findOneChannelByOwnerId(chOwnerId: number) {
    return await this.dbChannelService.findOneByOwnerId(chOwnerId);
  }

  async isExistedName(displayName: string) {
    return await this.dbUserService.isExistedName(displayName);
  }

  // NOTE update
  async updateUserName(uid: number, displayName: string) {
    return await this.dbUserService.updateName(uid, displayName);
  }
  async updateUserAvatar(uid: number, imgUri: string) {
    return await this.dbUserService.updateimgUri(uid, imgUri);
  }
  async updateUserRating(uid: number, rating: number) {
    return await this.dbUserService.updateRating(uid, rating);
  }
  async updateUserIsRequiredTFA(uid: number, isRequiredTFA: boolean) {
    return await this.dbUserService.updateIsRequiredTFA(uid, isRequiredTFA);
  }

  async updateUserStatus(uid: number, status: UserStatus) {
    return await this.dbUserService.updateUserStatus(uid, status);
  }

  async updateChName(uid: number, chid: number, chName: string) {
    await this.checkPermissionInChannel(
      uid,
      chid,
      'you can`t edit channel name.',
    );
    return await this.dbChannelService.updateChName(chid, chName);
  }

  async updateChDisplay(uid: number, chid: number, mode: ChannelMode) {
    await this.checkPermissionInChannel(
      uid,
      chid,
      'you can`t edit channel display state.',
    );
    return await this.dbChannelService.updateDisplay(chid, mode);
  }

  async updateChRemovePassword(uid: number, chid: number) {
    await this.checkPermissionInChannel(
      uid,
      chid,
      'you can`t remove channel password.',
    );
    return await this.dbChannelService.removePassword(chid);
  }

  async updateChSetPassword(uid: number, chid: number, password: string) {
    await this.checkPermissionInChannel(
      uid,
      chid,
      'you can`t set channel password.',
    );
    return await this.dbChannelService.setPassword(chid, password);
  }

  async banUserInChannel(myUid: number, targetUid: number, chid: number) {
    await this.checkPermissionInChannel(
      myUid,
      chid,
      'you can`t ban user in channel.',
    );
    return await this.dbUserInChannelService.banOne(targetUid, chid);
  }

  async muteUserInChannel(myUid: number, targetUid: number, chid: number) {
    await this.checkPermissionInChannel(
      myUid,
      chid,
      'you can`t mute user in channel.',
    );
    return await this.dbUserInChannelService.muteOne(targetUid, chid);
  }

  async unbanUserInChannel(myUid: number, targetUid: number, chid: number) {
    await this.checkPermissionInChannel(
      myUid,
      chid,
      'you can`t unban user in channel.',
    );
    return await this.dbUserInChannelService.unbanOne(targetUid, chid);
  }

  async unmuteUserInChannel(myUid: number, targetUid: number, chid: number) {
    await this.checkPermissionInChannel(
      myUid,
      chid,
      'you can`t unmute user in channel.',
    );
    return await this.dbUserInChannelService.unmuteOne(targetUid, chid);
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
    return await this.dbUserInChannelService.changeRole(targetUid, chid, role);
  }

  // NOTE delete

  async deleteUser(uid: number) {
    // NOTE 디버그 용
    await this.dbFriendListService.deleteAll(uid);
    await this.dbBlockListService.deleteAll(uid);
    await this.dbUserInChannelService.deleteUserInChannelAll(uid);
    await this.dbMatchHistoryService.deleteUserAll(uid);
    await this.dbDmLogsService.deleteUserAll(uid);
    return await this.dbUserService.deleteOne(uid);
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
    if (channel.chOwnerId === uid) this.deleteChannel(uid, chid);
    return await this.dbUserInChannelService.deleteOne(uid, chid);
  }

  async deleteMatchHistory() {
    return await this.dbMatchHistoryService.deleteAll();
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
