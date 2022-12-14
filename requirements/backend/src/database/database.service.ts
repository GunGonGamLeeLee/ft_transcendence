import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { UserDataChatType } from 'src/chat/chat.room.users.service';
import { ChannelUpdateDto } from 'src/chat/dto/channel.update.dto';
import { ProfileType } from 'src/users/dto/profile.type.dto';
import { ProfileUpdateDto } from 'src/users/dto/profile.update.dto';
import { UserDataType } from 'src/users/dto/user.data.type.dto';
import { DataSource, QueryRunner } from 'typeorm';
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
import {
  UserInChannelEntity,
  UserRoleInChannel,
} from './entity/entity.user.in.channel';

const MAX_CHANNEL_COUNT = 10; // ANCHOR 여기 있는게 맞나..?
// const MAX_DM_SIZE = 200;

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
    private dataSource: DataSource,
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.dbUserService.saveOne(queryRunner, userDto);
      await this.dbChannelService.saveOne(
        queryRunner,
        {
          chName: `dm${user.uid}`,
          chOwnerId: user.uid,
          mode: ChannelMode.dm,
          password: '',
        },
        user,
      );
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('데이터 베이스 오류', 500);
    } finally {
      await queryRunner.release();
    }
  }

  async addFriend(myUid: number, friendUid: number) {
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
    const queryRunner = this.dataSource.createQueryRunner();
    let channel;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      channel = await this.dbChannelService.saveOne(
        queryRunner,
        channelDto,
        user,
      );
      const userInChannelDto: UserInChannelDto = {
        uid: channelDto.chOwnerId,
        chid: channel.chid,
        role: UserRoleInChannel.OWNER,
        isMute: false,
        isBan: false,
      };
      await this.dbUserInChannelService.saveOne(
        queryRunner,
        userInChannelDto,
        user,
        channel,
      );
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return channel;
  }

  async addUserInChannel(newUser: UserInChannelDto): Promise<UserDataChatType> {
    const userInfo: UserEntity = await this.dbUserService.findOne(newUser.uid);
    const channel: ChannelEntity = await this.dbChannelService.findOne(
      newUser.chid,
    );

    if (userInfo == null || channel == null)
      throw new HttpException('존재하지 않는 값입니다.', HttpStatus.NOT_FOUND);

    const usersInChannel = await this.listUserInChannelWithUserInfo(
      newUser.chid,
    );

    for (const userInChannel of usersInChannel) {
      if (userInChannel.user.uid === newUser.uid) {
        return { ...userInChannel.user, role: userInChannel.role };
      }
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let savedUser: UserInChannelEntity;
    try {
      savedUser = await this.dbUserInChannelService.saveOne(
        queryRunner,
        newUser,
        userInfo,
        channel,
      );
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('데이터 베이스 오류', 500);
    } finally {
      await queryRunner.release();
    }
    return { ...savedUser.user, role: savedUser.role };
  }

  async addDmLog(queryRunner: QueryRunner, dmLog: DmLogDto) {
    const fromUser: UserEntity = await this.dbUserService.findOne(
      dmLog.fromUid,
    );
    const toUser: UserEntity = await this.dbUserService.findOne(dmLog.toUid);
    if (fromUser == null || toUser == null)
      throw new HttpException(
        '존재하지 않는 유저입니다.',
        HttpStatus.NOT_FOUND,
      );
    if (fromUser.uid === toUser.uid)
      throw new HttpException('잘못된 요청입니다.', HttpStatus.FORBIDDEN);

    await this.dbDmLogsService.saveOne(queryRunner, dmLog, fromUser, toUser);
  }

  async addMatchHistory(
    queryRunner: QueryRunner,
    matchHistory: MatchHistoryDto,
  ) {
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
      queryRunner,
      matchHistory,
      winner,
      loser,
    );
  }

  // NOTE find
  async findOneUser(uid: number) {
    return await this.dbUserService.findOne(uid);
  }
  async findOneUserProfile(uid: number): Promise<ProfileType> {
    return await this.dbUserService.findOneProfile(uid);
  }
  async findOneUserSmallProfile(uid: number): Promise<ProfileType> {
    return await this.dbUserService.findOneSmallProfile(uid);
  }
  async findOneUserData(uid: number): Promise<UserDataType> {
    return await this.dbUserService.findOneData(uid);
  }

  async findUserByName(nickname: string) {
    return await this.dbUserService.findUserByName(nickname);
  }

  async findOneChannel(chid: number) {
    return await this.dbChannelService.findOne(chid);
  }

  async findOneDmChannelByOwnerId(chOwnerId: number) {
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

  async updateChDisplay(
    uid: number,
    chid: number,
    mode: ChannelMode,
    password: string,
  ) {
    await this.checkPermissionInChannel(
      uid,
      chid,
      'you can`t edit channel display state.',
    );
    return await this.dbChannelService.updateDisplay(chid, mode, password);
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

  async updateChannel(uid: number, channelDto: ChannelUpdateDto) {
    await this.checkPermissionInChannel(
      uid,
      channelDto.chid,
      '채팅방의 설정을 바꿀 수 없습니다.',
    );
    return await this.dbChannelService.updateChannel(channelDto);
  }

  async updateUserGameRoom(uid1: number, uid2: number, roomId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(
        UserEntity,
        { uid: uid1 },
        { gameRoom: roomId, status: UserStatus.INGAME },
      );
      await queryRunner.manager.update(
        UserEntity,
        { uid: uid2 },
        { gameRoom: roomId, status: UserStatus.INGAME },
      );
    } catch (e) {
      throw new WsException('데이터 베이스 오류');
    } finally {
      await queryRunner.release();
    }
  }

  async updateUserExitGameRoom(uid1: number, uid2: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(
        UserEntity,
        { uid: uid1 },
        { gameRoom: '', status: UserStatus.ONLINE },
      );
      await queryRunner.manager.update(
        UserEntity,
        { uid: uid2 },
        { gameRoom: '', status: UserStatus.ONLINE },
      );
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new WsException('데이터 베이스 오류');
    } finally {
      await queryRunner.release();
    }
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

  async unbanUserInChannel(
    queryRunner: QueryRunner,
    myUid: number,
    targetUid: number,
    chid: number,
  ) {
    await this.checkPermissionInChannel(
      myUid,
      chid,
      'you can`t unban user in channel.',
    );
    return await queryRunner.manager.update(
      UserInChannelEntity,
      { uid: targetUid, chid },
      { isBan: false },
    );
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
    roleTo: UserRoleInChannel,
  ) {
    await this.checkPermissionInChannel(
      myUid,
      chid,
      'you can`t change role in channel.',
    );
    if (roleTo === UserRoleInChannel.OWNER)
      throw new HttpException(
        'OWNER로 변경할 수 없습니다.',
        HttpStatus.FORBIDDEN,
      );
    if (roleTo > UserRoleInChannel.USER || roleTo < UserRoleInChannel.OWNER)
      throw new HttpException(
        '구현되지 않았습니다.',
        HttpStatus.NOT_IMPLEMENTED,
      );
    return await this.dbUserInChannelService.changeRole(
      targetUid,
      chid,
      roleTo,
    );
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

  async deleteChannel(queryRunner: QueryRunner, uid: number, chid: number) {
    await this.checkPermissionInChannel(uid, chid, 'you can`t delete channel.');
    await queryRunner.manager.delete(UserInChannelEntity, { chid });
    await queryRunner.manager.delete(ChannelEntity, { chid });
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

  async deleteUserInChannel(
    queryRunner: QueryRunner,
    uid: number,
    chid: number,
  ) {
    const channel = await this.dbChannelService.findOne(chid);
    if (channel == null)
      throw new HttpException('없는 채널입니다.', HttpStatus.NOT_FOUND);

    if (channel.chOwnerId === uid)
      await this.deleteChannel(queryRunner, uid, chid);
    await queryRunner.manager.delete(UserInChannelEntity, { uid, chid });
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
    if (uic == null)
      throw new HttpException(`NOT FOUND USER`, HttpStatus.NOT_FOUND);
    if (uic.role === UserRoleInChannel.USER)
      throw new HttpException(msg, HttpStatus.FORBIDDEN);
  }

  async saveGameResult(
    matchHistory: MatchHistoryDto,
    winner: UserEntity,
    loser: UserEntity,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.addMatchHistory(queryRunner, matchHistory);
      if (matchHistory.isRank) {
        await queryRunner.manager.update(
          UserEntity,
          { uid: winner.uid },
          { rating: winner.rating },
        );
        await queryRunner.manager.update(
          UserEntity,
          { uid: loser.uid },
          { rating: loser.rating },
        );
      }
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new WsException('데이터 베이스 오류');
    } finally {
      await queryRunner.release();
    }
  }

  async unbanUser(myUid: number, targetUid: number, chid: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.unbanUserInChannel(queryRunner, myUid, targetUid, chid);
      await this.deleteUserInChannel(queryRunner, targetUid, chid);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new WsException('데이터 베이스 오류');
    } finally {
      await queryRunner.release();
    }
  }
}
