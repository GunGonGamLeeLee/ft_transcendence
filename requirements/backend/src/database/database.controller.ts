import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DbFriendListService } from './db.friend.list/db.friend.list.service';
import { DbUserService } from './db.user/db.user.service';
import { UserDto } from './dto/user.dto';

@Controller('database')
export class DatabaseController {
  constructor(
    private readonly dbUserSerivce: DbUserService,
    private readonly dbFriendListSerivce: DbFriendListService,
  ) {}

  @ApiTags('database')
  @ApiOperation({ summary: '전체 유저 목록 보기' })
  @Get('list-user')
  async listUser() {
    return await this.dbUserSerivce.findAll();
  }

  @ApiTags('database')
  @ApiOperation({ summary: '유저 추가해보기' })
  @Post('add-user')
  async addUser(@Body() body: UserDto) {
    return await this.dbUserSerivce.saveOne({
      ...body,
    });
  }

  @ApiTags('database')
  @ApiOperation({ summary: '유저의 친구 추가 하기' })
  @Get('add-friend')
  @ApiHeader({ name: 'friend_uid' })
  @ApiHeader({ name: 'my_uid' })
  async addFriend(@Headers() header) {
    const user = await this.dbUserSerivce.findOneById(header.my_uid);
    this.dbFriendListSerivce.saveOne(
      { fuid: +header.my_uid, tuid: +header.friend_uid },
      user,
    );
  }

  @ApiTags('database')
  @ApiOperation({ summary: '전체 친구 목록 보기' })
  @Get('list-friend')
  async listFriend() {
    return await this.dbFriendListSerivce.findAll();
  }

  @ApiTags('database')
  @ApiOperation({ summary: '유저의 친구 목록 보기' })
  @ApiHeader({ name: 'uid' })
  @Get('list-user-friend')
  listUserFriend(@Headers() header) {
    return this.dbUserSerivce.findFriendList(header.uid);
  }
}
