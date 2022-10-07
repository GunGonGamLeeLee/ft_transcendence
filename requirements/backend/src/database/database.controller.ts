import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DbUserService } from './db.user/db.user.service';
import { DbFriendListService } from './db.friend.list/db.friend.list.service';
import { DbBlockListService } from './db.block.list/db.block.list.service';
import { UserDto } from './dto/user.dto';

@Controller('database')
export class DatabaseController {
  constructor(
    private readonly dbUserService: DbUserService,
    private readonly dbFriendListService: DbFriendListService,
    private readonly dbBlockListService: DbBlockListService,
  ) {}

  @ApiTags('database')
  @ApiOperation({ summary: '전체 유저 목록 보기' })
  @Get('list-user')
  async listUser() {
    return await this.dbUserService.findAll();
  }

  @ApiTags('database')
  @ApiHeader({ name: 'Authorization' })
  @ApiOperation({ summary: '유저 추가해보기' })
  @Post('add-user')
  async addUser(@Body() body: UserDto) {
    return await this.dbUserService.saveOne({
      ...body,
    });
  }

  @ApiTags('database')
  @ApiOperation({ summary: '유저의 친구 추가 하기' })
  @Get('add-friend')
  @ApiHeader({ name: 'friend_uid' })
  @ApiHeader({ name: 'my_uid' })
  async addFriend(@Headers() header) {
    const user = await this.dbUserService.findOneById(header.my_uid);
    this.dbFriendListService.saveOne(
      { fuid: +header.my_uid, tuid: +header.friend_uid },
      user,
    );
  }

  @ApiTags('database')
  @ApiOperation({ summary: '전체 친구 목록 보기' })
  @Get('list-friend')
  async listFriend() {
    return await this.dbFriendListService.findAll();
  }

  @ApiTags('database')
  @ApiOperation({ summary: '유저의 친구 목록 보기' })
  @ApiHeader({ name: 'uid' })
  @Get('list-user-friend')
  listUserFriend(@Headers() header) {
    return this.dbFriendListService.findOneByIdInFriendList(header.uid);
  }

  @ApiTags('database')
  @ApiOperation({ summary: '전체 차단 목록 보기' })
  @Get('list-block')
  async listBlock() {
    return await this.dbBlockListService.findAll();
  }

  @ApiTags('database')
  @ApiOperation({ summary: '유저 차단 하기' })
  @Get('add-block')
  @ApiHeader({ name: 'block_uid' })
  @ApiHeader({ name: 'my_uid' })
  async addblock(@Headers() header) {
    const user = await this.dbUserService.findOneById(header.my_uid);
    this.dbBlockListService.saveOne(
      { fuid: +header.my_uid, tuid: +header.block_uid },
      user,
    );
  }

  @ApiTags('database')
  @ApiOperation({ summary: '유저의 차단 목록 보기' })
  @ApiHeader({ name: 'uid' })
  @Get('list-user-block')
  listUserBlock(@Headers() header) {
    return this.dbBlockListService.findOneByIdInBlockList(header.uid);
  }
}
