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
import { UserDto } from './dto/user.dto';
import { UserInChannelDto } from './dto/user.in.channel.dto';

// 데이터베이스 테스트 용도로 작성된 파일입니다.

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @ApiTags('database/User')
  @ApiOperation({ summary: '전체 유저 목록 보기' })
  @Get('show-user-table')
  async listAllUser() {
    return await this.databaseService.listAllUser();
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
    // TODO type
    return await this.databaseService.listUserFriend(header.uid);
  }
  @ApiTags('database/FriendList')
  @ApiOperation({ summary: '유저의 친구 목록 보기' })
  @ApiHeader({ name: 'uid' })
  @Get('list-user-friend-with-info')
  async listUserFriendWithFriendInfo(@Headers() header) {
    // TODO type
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
    // TODO type
    return await this.databaseService.listUserBlockWithInfo(header.uid);
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '유저의 채널 목록 보기' })
  @ApiHeader({ name: 'uid' })
  @Get('list-channel-of-user')
  async listChannelOfUser(@Headers() header) {
    // TODO type
    return await this.databaseService.listChannelOfUser(header.uid);
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '유저의 채널 목록 보기' })
  @ApiHeader({ name: 'uid' })
  @Get('list-channel-of-user-with-channel-info')
  async listChannelOfUserWithChannelInfo(@Headers() header) {
    // TODO type
    return await this.databaseService.listChannelOfUserWithChannelInfo(
      header.uid,
    );
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널의 유저 목록 보기' })
  @ApiHeader({ name: 'chid' })
  @Get('list-user-in-channel')
  async listUserInChannel(@Headers() header) {
    // TODO type
    return await this.databaseService.listUserInChannel(header.chid);
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널의 유저 목록 보기' })
  @ApiHeader({ name: 'chid' })
  @Get('list-user-in-channel-with-user-info')
  async listUserInChannelWithUserInco(@Headers() header) {
    // TODO type
    return await this.databaseService.listUserInChannelWithUserInfo(
      header.chid,
    );
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널의 음소거 유저 목록 보기' })
  @ApiHeader({ name: 'chid' })
  @Get('list-mute-user-in-channel-with-user-info')
  async listMuteUserInChannelWithUserInco(@Headers() header) {
    // TODO type
    return await this.databaseService.listMuteUserInChannelWithUserInfo(
      header.chid,
    );
  }
  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널의 입장금지 유저 목록 보기' })
  @ApiHeader({ name: 'chid' })
  @Get('list-ban-user-in-channel-with-user-info')
  async listBanUserInChannelWithUserInco(@Headers() header) {
    // TODO type
    return await this.databaseService.listBanUserInChannelWithUserInfo(
      header.chid,
    );
  }

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

  @ApiTags('database/User')
  @ApiOperation({ summary: '표시 이름 바꾸기' })
  @ApiHeader({ name: 'name' })
  @ApiHeader({ name: 'uid' })
  @Put('update-name-of-User')
  async updateNameOfUser(@Headers() header) {
    return await this.databaseService.updateNameOfUser(header.uid, header.name);
  }

  @ApiTags('database/User')
  @ApiOperation({ summary: '아바타 바꾸기' })
  @ApiHeader({ name: 'path' })
  @ApiHeader({ name: 'uid' })
  @Put('update-avatar-of-User')
  async updateAvatarOfUser(@Headers() header) {
    return await this.databaseService.updateAvatarOfUser(
      header.uid,
      header.path,
    );
  }

  @ApiTags('database/User')
  @ApiOperation({ summary: '랭크 점수 바꾸기' })
  @ApiHeader({ name: 'rating' })
  @ApiHeader({ name: 'uid' })
  @Put('update-rating-of-User')
  async updateRatingOfUser(@Headers() header) {
    return await this.databaseService.updateRatingOfUser(
      header.uid,
      header.rating,
    );
  }

  @ApiTags('database/User')
  @ApiOperation({ summary: '2단계 인증 여부 바꾸기' })
  @ApiHeader({ name: 'isRequiredTFA' })
  @ApiHeader({ name: 'uid' })
  @Put('update-isRequiredTFA-of-User')
  async updateIsRequiredTFAOfUser(@Headers() header) {
    return await this.databaseService.updateIsRequiredTFAOfUser(
      header.uid,
      header.isRequiredTFA == 'true',
    );
  }

  @ApiTags('database/User')
  @ApiOperation({ summary: '유저 상태 바꾸기' })
  @ApiHeader({ name: 'userStatus' })
  @ApiHeader({ name: 'uid' })
  @Put('update-name-of-User')
  async updateUserStatusOfUser(@Headers() header) {
    return await this.databaseService.updateUserStatusOfUser(
      header.uid,
      header.userStatus,
    );
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널 안의 유저 음소거하기' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'uid' })
  @Put('mute-user-in-channel')
  async muteUserInChannel(@Headers() header) {
    return await this.databaseService.muteUserInChannel(
      header.uid,
      header.chid,
    );
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널 안의 유저 음소거 풀기' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'uid' })
  @Put('unmute-user-in-channel')
  async unmuteUserInChannel(@Headers() header) {
    return await this.databaseService.unmuteUserInChannel(
      header.uid,
      header.chid,
    );
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널 안의 유저 밴하기' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'uid' })
  @Put('ban-user-in-channel')
  async banUserInChannel(@Headers() header) {
    return await this.databaseService.banUserInChannel(header.uid, header.chid);
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널 안의 유저 밴 풀기' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'uid' })
  @Put('unban-user-in-channel')
  async unbanUserInChannel(@Headers() header) {
    return await this.databaseService.unbanUserInChannel(
      header.uid,
      header.chid,
    );
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널 안의 유저 역할 바꾸기' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'uid' })
  @ApiHeader({
    name: 'role',
    description: '채널 주인: 0, 관리자: 1, 일반 유저: 2',
  })
  @Put('change-user-role-in-channel')
  async changeUserRoleInChannel(@Headers() header) {
    return await this.databaseService.changeUserRoleInChannel(
      header.uid,
      header.chid,
      header.role,
    );
  }

  @ApiTags('database/User')
  @ApiOperation({ summary: '유저 지우기' })
  @ApiHeader({ name: 'uid' })
  @Delete('delete-user')
  async deleteUser(@Headers() header) {
    return await this.databaseService.deleteUser(header.uid);
  }

  @ApiTags('database/FriendList')
  @ApiOperation({ summary: '친구 삭제하기' })
  @ApiHeader({ name: 'friendUid' })
  @ApiHeader({ name: 'myUid' })
  @Delete('delete-friend')
  async deleteFriendOfUser(@Headers() header) {
    return await this.databaseService.deleteFriendOfUser(
      header.myUid,
      header.friendUid,
    );
  }

  @ApiTags('database/BlockList')
  @ApiOperation({ summary: '차단 해제하기' })
  @ApiHeader({ name: 'blockUid' })
  @ApiHeader({ name: 'myUid' })
  @Delete('delete-block')
  async deleteBlockOfUser(@Headers() header) {
    return await this.databaseService.deleteBlockOfUser(
      header.myUid,
      header.blockUid,
    );
  }

  @ApiTags('database/UserInChannel')
  @ApiOperation({ summary: '채널에서 나가기' })
  @ApiHeader({ name: 'chid' })
  @ApiHeader({ name: 'uid' })
  @Delete('delete-user-in-channel')
  async deleteUserInChannel(@Headers() header) {
    return await this.databaseService.deleteUserInChannel(
      header.uid,
      header.chid,
    );
  }
}
