import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DatabaseService } from './database.service';
import { ChannelDto } from './dto/channel.dto';
import { DmLogDto } from './dto/dm.log.dto';
import { MatchHistoryDto } from './dto/match.history.dto';
import { UserDto } from './dto/user.dto';
import { UserInChannelDto } from './dto/user.in.channel.dto';

// 데이터베이스 테스트 용도로 작성된 파일입니다.

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  //NOTE - GET
  @ApiTags('database/User')
  @ApiOperation({ summary: '특정 유저 정보 보기' })
  @ApiHeader({ name: 'uid' })
  @Get('show-user')
  async showUserById(@Headers() header) {
    return await this.databaseService.findOneUser(header.uid);
  }

  @ApiTags('database/Channel')
  @ApiOperation({ summary: '특정 채널 정보 보기' })
  @ApiHeader({ name: 'chid' })
  @Get('show-channel')
  async showChannelById(@Headers() header) {
    return await this.databaseService.findOneChannel(header.chid);
  }

  @ApiTags('database/User')
  @ApiOperation({ summary: '전체 유저 목록 보기' })
  @Get('show-user-list')
  async listAllUser() {
    return await this.databaseService.listAllUser();
  }
  @ApiTags('database/User')
  @ApiOperation({ summary: '유저 랭킹 목록 보기' })
  @Get('show-user-list-rank')
  async listUserRank() {
    return await this.databaseService.listUserRank();
  }

  @ApiTags('database/FriendList')
  @ApiOperation({ summary: '전체 친구 목록 보기' })
  @Get('show-friend-list-table')
  async listAllFriend() {
    return await this.databaseService.listAllFriend();
  }

  @ApiTags('database/BlockList')
  @ApiOperation({ summary: '전체 차단 목록 보기' })
  @Get('show-block-list-table')
  async listAllBlock() {
    return await this.databaseService.listAllBlock();
  }

  @ApiTags('database/Channel')
  @ApiOperation({ summary: '전체 채널 목록 보기' })
  @Get('show-channel-table')
  async listAllChannel() {
    return await this.databaseService.listAllChannel();
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '전체 유저-채널 목록 보기' })
  @Get('show-user-in-channel-table')
  async listAllUserInChannel() {
    return await this.databaseService.listAllUserInChannel();
  }

  @ApiTags('database/FriendList')
  @ApiOperation({ summary: '유저의 친구 목록 보기' })
  @ApiHeader({ name: 'uid' })
  @Get('list-user-friend')
  async listUserFriend(@Headers() header) {
    return await this.databaseService.listUserFriend(header.uid);
  }
  @ApiTags('database/FriendList')
  @ApiOperation({ summary: '유저의 친구 목록 보기' })
  @ApiHeader({ name: 'uid' })
  @Get('list-user-friend-with-info')
  async listUserFriendWithFriendInfo(@Headers() header) {
    return await this.databaseService.listUserFriendWithInfo(header.uid);
  }

  @ApiTags('database/BlockList')
  @ApiOperation({ summary: '유저의 차단 목록 보기' })
  @ApiHeader({ name: 'uid' })
  @Get('list-user-block')
  listUserBlock(@Headers() header) {
    return this.databaseService.listUserBlock(header.uid);
  }
  @ApiTags('database/BlockList')
  @ApiOperation({ summary: '유저의 차단 목록 보기' })
  @ApiHeader({ name: 'uid' })
  @Get('list-user-block-with-info')
  async listUserBlockWithBlockInfo(@Headers() header) {
    return await this.databaseService.listUserBlockWithInfo(header.uid);
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '유저의 채널 목록 보기' })
  @ApiHeader({ name: 'uid' })
  @Get('list-channel-of-user')
  async listChannelOfUser(@Headers() header) {
    return await this.databaseService.listChannelOfUser(header.uid);
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '유저의 채널 목록 보기' })
  @ApiHeader({ name: 'uid' })
  @Get('list-channel-of-user-with-channel-info')
  async listChannelOfUserWithChannelInfo(@Headers() header) {
    return await this.databaseService.listChannelOfUserWithChannelInfo(
      header.uid,
    );
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널의 유저 목록 보기' })
  @ApiHeader({ name: 'chid' })
  @Get('list-user-in-channel')
  async listUserInChannel(@Headers() header) {
    return await this.databaseService.listUserInChannel(header.chid);
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널의 유저 목록 보기' })
  @ApiHeader({ name: 'chid' })
  @Get('list-user-in-channel-with-user-info')
  async listUserInChannelWithUserInco(@Headers() header) {
    return await this.databaseService.listUserInChannelWithUserInfo(
      header.chid,
    );
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널의 음소거 유저 목록 보기' })
  @ApiHeader({ name: 'chid' })
  @Get('list-mute-user-in-channel-with-user-info')
  async listMuteUserInChannelWithUserInco(@Headers() header) {
    return await this.databaseService.listMuteUserInChannelWithUserInfo(
      header.chid,
    );
  }
  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널의 입장금지 유저 목록 보기' })
  @ApiHeader({ name: 'chid' })
  @Get('list-ban-user-in-channel-with-user-info')
  async listBanUserInChannelWithUserInco(@Headers() header) {
    return await this.databaseService.listBanUserInChannelWithUserInfo(
      header.chid,
    );
  }

  @ApiTags('database/Dm')
  @ApiOperation({ summary: 'DM로그 전체 보기' })
  // @ApiHeader({ })
  @Get('list-dm')
  async listAllDmLogs() {
    return await this.databaseService.listAllDmLogs();
  }

  @ApiTags('database/Dm')
  @ApiOperation({ summary: 'user1과 user2가 주고받은 dm 보기' })
  @ApiHeader({ name: 'user1' })
  @ApiHeader({ name: 'user2' })
  @Get('list-dm-of-user')
  async listDmOfUser(@Headers() headers) {
    return await this.databaseService.listDmOfUser(
      headers.user1,
      headers.user2,
    );
  }

  @ApiTags('database/MatchHistory')
  @ApiOperation({ summary: '전체 전적 보기' })
  @Get('show-match-history')
  async listAllMatchHistory() {
    return await this.databaseService.listAllMatchHistory();
  }

  @ApiTags('database/MatchHistory')
  @ApiOperation({ summary: '유저의 전적 전부 보기' })
  @ApiHeader({ name: 'uid' })
  @Get('list-all-match-history-of-user')
  async listAllMatchHistoryOfUser(@Headers() header) {
    return await this.databaseService.listAllMatchHistoryOfUser(header.uid);
  }

  @ApiTags('database/MatchHistory')
  @ApiOperation({ summary: '유저의 전적 전부 보기' })
  @ApiHeader({ name: 'uid' })
  @Get('list-all-match-history-of-user-with-user-info')
  async listAllMatchHistoryOfUserWithUserInfo(@Headers() header) {
    return await this.databaseService.listAllMatchHistoryOfUserWithUserInfo(
      header.uid,
    );
  }

  @ApiTags('database/MatchHistory')
  @ApiOperation({ summary: '유저의 전적 보기 (take, page)' })
  @ApiHeader({ name: 'uid' })
  @ApiHeader({ name: 'take' })
  @ApiHeader({ name: 'page' })
  @Get('list-user-match-history')
  async listMatchHistoryOfUser(@Headers() header) {
    return await this.databaseService.listMatchHistoryOfUser(
      header.uid,
      header.take,
      header.page,
    );
  }

  @ApiTags('database/MatchHistory')
  @ApiOperation({ summary: '유저의 전적 보기 (take, page)' })
  @ApiHeader({ name: 'uid' })
  @ApiHeader({ name: 'take' })
  @ApiHeader({ name: 'page' })
  @Get('list-user-match-history-with-user-info')
  async listMatchHistoryOfUserWithUserInfo(@Headers() header) {
    return await this.databaseService.listMatchHistoryOfUserWithUserInfo(
      header.uid,
      header.take,
      header.page,
    );
  }

  //NOTE - POST
  @ApiTags('database/User')
  @ApiOperation({ summary: '유저 추가하기' })
  @Post('add-user')
  async addUser(@Body() body: UserDto) {
    return await this.databaseService.addUser(body);
  }

  @ApiTags('database/FriendList')
  @ApiOperation({ summary: '유저의 친구 추가하기' })
  @ApiHeader({ name: 'friend_uid' })
  @ApiHeader({ name: 'my_uid' })
  @Post('add-friend')
  async addFriend(@Headers() header) {
    return await this.databaseService.addFriend(
      header.my_uid,
      header.friend_uid,
    );
  }

  @ApiTags('database/BlockList')
  @ApiOperation({ summary: '유저 차단하기' })
  @ApiHeader({ name: 'block_uid' })
  @ApiHeader({ name: 'my_uid' })
  @Post('add-block')
  async addBlock(@Headers() header) {
    return await this.databaseService.addBlock(header.my_uid, header.block_uid);
  }

  @ApiTags('database/Channel')
  @ApiOperation({ summary: '채널 추가하기' })
  @Post('add-channel')
  async addChannel(@Body() body: ChannelDto) {
    return await this.databaseService.addChannel(body);
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널에 유저 추가하기' })
  @ApiBody({
    description: '채널 주인: 0, 관리자: 1, 일반 유저: 2',
    type: UserInChannelDto,
  })
  @Post('add-user-in-channel')
  async addUserInChannel(@Body() body: UserInChannelDto) {
    return await this.databaseService.addUerInChannel(body);
  }

  @ApiTags('database/Dm')
  @ApiOperation({ summary: 'Dm 로그 추가하기' })
  @Post('add-dm')
  async addDmLog(@Body() body: DmLogDto) {
    return await this.databaseService.addDmLog(body);
  }

  @ApiTags('database/MatchHistory')
  @ApiOperation({ summary: '전적 추가하기' })
  @Post('add-match-history')
  async addMatchHistory(@Body() body: MatchHistoryDto) {
    return await this.databaseService.addMatchHistory(body);
  }

  //NOTE - PUT
  @ApiTags('database/User')
  @ApiOperation({ summary: '표시 이름 바꾸기' })
  @ApiHeader({ name: 'name' })
  @ApiHeader({ name: 'uid' })
  @Put('update-user-name')
  async updateNameOfUser(@Headers() header) {
    return await this.databaseService.updateUserName(header.uid, header.name);
  }

  @ApiTags('database/User')
  @ApiOperation({ summary: '아바타 바꾸기' })
  @ApiHeader({ name: 'path' })
  @ApiHeader({ name: 'uid' })
  @Put('update-user-avatar')
  async updateAvatarOfUser(@Headers() header) {
    return await this.databaseService.updateUserAvatar(header.uid, header.path);
  }

  @ApiTags('database/User')
  @ApiOperation({ summary: '랭크 점수 바꾸기' })
  @ApiHeader({ name: 'rating' })
  @ApiHeader({ name: 'uid' })
  @Put('update-user-rating')
  async updateRatingOfUser(@Headers() header) {
    return await this.databaseService.updateUserRating(
      header.uid,
      header.rating,
    );
  }

  @ApiTags('database/User')
  @ApiOperation({ summary: '2단계 인증 여부 바꾸기' })
  @ApiHeader({ name: 'is_required_tfa' })
  @ApiHeader({ name: 'uid' })
  @Put('update-user-isRequiredTFA')
  async updateIsRequiredTFAOfUser(@Headers() header) {
    return await this.databaseService.updateUserIsRequiredTFA(
      header.uid,
      header.is_required_tfa === 'true',
    );
  }

  @ApiTags('database/User')
  @ApiOperation({ summary: '유저 상태 바꾸기' })
  @ApiHeader({
    name: 'user_status',
    description: '오프라인: 0, 온라인: 1, 인채널: 2, 인게임: 3',
  })
  @ApiHeader({ name: 'uid' })
  @Put('update-user-status')
  async updateUserStatusOfUser(@Headers() header) {
    return await this.databaseService.updateUserStatus(
      header.uid,
      header.user_status,
    );
  }

  @ApiTags('database/Channel')
  @ApiOperation({ summary: '채널 이름 바꾸기' })
  @ApiHeader({ name: 'ch_name' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'uid' })
  @Put('update-ch-name')
  async updateChName(@Headers() header) {
    return await this.databaseService.updateChName(
      header.uid,
      header.chid,
      header.ch_name,
    );
  }

  @ApiTags('database/Channel')
  @ApiOperation({ summary: '채널 공개 여부 바꾸기' })
  @ApiHeader({ name: 'display' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'uid' })
  @Put('update-ch-display')
  async updateChDisplay(@Headers() header) {
    return await this.databaseService.updateChDisplay(
      header.uid,
      header.chid,
      header.display === 'true',
    );
  }

  @ApiTags('database/Channel')
  @ApiOperation({ summary: '채널 비밀번호 설정하기' })
  @ApiHeader({ name: 'password' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'uid' })
  @Put('update-ch-set-password')
  async updateChSetPassword(@Headers() header) {
    return await this.databaseService.updateChSetPassword(
      header.uid,
      header.chid,
      header.password,
    );
  }

  @ApiTags('database/Channel')
  @ApiOperation({ summary: '채널 비밀번호 삭제하기' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'uid' })
  @Put('update-ch-remove-password')
  async updateChRemovePassword(@Headers() header) {
    return await this.databaseService.updateChRemovePassword(
      header.uid,
      header.chid,
    );
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널 안의 유저 음소거하기' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'target_uid' })
  @ApiHeader({ name: 'my_uid' })
  @Put('mute-user-in-channel')
  async muteUserInChannel(@Headers() header) {
    return await this.databaseService.muteUserInChannel(
      header.my_uid,
      header.target_uid,
      header.chid,
    );
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널 안의 유저 음소거 풀기' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'target_uid' })
  @ApiHeader({ name: 'my_uid' })
  @Put('unmute-user-in-channel')
  async unmuteUserInChannel(@Headers() header) {
    return await this.databaseService.unmuteUserInChannel(
      header.my_uid,
      header.target_uid,
      header.chid,
    );
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널 안의 유저 밴하기' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'target_uid' })
  @ApiHeader({ name: 'my_uid' })
  @Put('ban-user-in-channel')
  async banUserInChannel(@Headers() header) {
    return await this.databaseService.banUserInChannel(
      header.my_uid,
      header.target_uid,
      header.chid,
    );
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널 안의 유저 밴 풀기' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'target_uid' })
  @ApiHeader({ name: 'my_uid' })
  @Put('unban-user-in-channel')
  async unbanUserInChannel(@Headers() header) {
    return await this.databaseService.unbanUserInChannel(
      header.my_uid,
      header.target_uid,
      header.chid,
    );
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널 안의 유저 역할 바꾸기' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'target_uid' })
  @ApiHeader({ name: 'my_uid' })
  @ApiHeader({
    name: 'role',
    description: '채널 주인: 0, 관리자: 1, 일반 유저: 2',
  })
  @Put('change-user-role-in-channel')
  async changeUserRoleInChannel(@Headers() header) {
    return await this.databaseService.changeUserRoleInChannel(
      header.my_uid,
      header.target_uid,
      header.chid,
      header.role,
    );
  }

  //NOTE - DELETE
  @ApiTags('database/User')
  @ApiOperation({ summary: '유저 지우기' })
  @ApiHeader({ name: 'uid' })
  @Delete('delete-user')
  async deleteUser(@Headers() header) {
    return await this.databaseService.deleteUser(header.uid);
  }

  @ApiTags('database/Channel')
  @ApiOperation({ summary: '채널 지우기' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'uid' })
  @Delete('delete-channel')
  async deleteChannel(@Headers() header) {
    return await this.databaseService.deleteChannel(header.uid, header.chid);
  }

  @ApiTags('database/FriendList')
  @ApiOperation({ summary: '친구 삭제하기' })
  @ApiHeader({ name: 'friend_id' })
  @ApiHeader({ name: 'my_uid' })
  @Delete('delete-friend')
  async deleteFriendOfUser(@Headers() header) {
    return await this.databaseService.deleteFriendOfUser(
      header.my_uid,
      header.friend_id,
    );
  }

  @ApiTags('database/FriendList')
  @ApiOperation({ summary: '친구 전부 삭제하기' })
  @ApiHeader({ name: 'my_uid' })
  @Delete('delete-friend-all')
  async deleteFriendAll(@Headers() header) {
    return await this.databaseService.deleteFriendAll(header.my_uid);
  }

  @ApiTags('database/BlockList')
  @ApiOperation({ summary: '차단 해제하기' })
  @ApiHeader({ name: 'block_uid' })
  @ApiHeader({ name: 'my_uid' })
  @Delete('delete-block')
  async deleteBlockOfUser(@Headers() header) {
    return await this.databaseService.deleteBlockOfUser(
      +header.my_uid,
      +header.block_uid,
    );
  }

  @ApiTags('database/BlockList')
  @ApiOperation({ summary: '차단 전부 해제하기' })
  @ApiHeader({ name: 'my_uid' })
  @Delete('delete-block-all')
  async deleteBlockAll(@Headers() header) {
    return await this.databaseService.deleteBlockAll(header.my_uid);
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널에서 나가기' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'uid' })
  @Delete('delete-user-in-channel')
  async deleteUserInChannel(@Headers() header) {
    return await this.databaseService.deleteUserInChannel(
      +header.uid,
      +header.chid,
    );
  }

  @ApiTags('database/MatchHistory')
  @ApiOperation({ summary: '모든 전적 삭제' })
  @Delete('delete-match-history')
  async deleteMatchHistory() {
    return await this.databaseService.deleteMatchHistory();
  }
}
