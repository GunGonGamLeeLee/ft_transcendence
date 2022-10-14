import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { MyUid } from 'src/users/decorator/uid.decorator';
import { ChatRoomListService } from './chat.room.list.service';
import { ChatRoomUsersService } from './chat.room.users.service';
import { ChannelPasswordDto } from './dto/channel.password.dto';

@UseGuards(AuthGuard)
@ApiTags('Chat')
@ApiBearerAuth('access-token')
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatRoomListService: ChatRoomListService,
    private readonly chatRoomUsersService: ChatRoomUsersService,
  ) {}

  //NOTE - GET
  @ApiOperation({ summary: '방 정보 가져오기' })
  @Get('roomlist')
  async roomlist(@MyUid() uid) {
    const ret = await this.chatRoomListService.getRoomList(uid);
    return ret;
  }

  @ApiOperation({ summary: '방의 유저 정보 가져오기' })
  @ApiQuery({ name: 'chid' })
  @Get('roomusers')
  async roomusers(@Query('chid', ParseIntPipe) chid) {
    const ret = await this.chatRoomUsersService.getRoomUsers(chid);
    return ret;
  }

  // NOTE - Post

  @ApiOperation({ summary: '채팅방 비밀번호 인증하기' })
  @Post('roomusers')
  async verifyPassword(@Body() body: ChannelPasswordDto) {
    const ret = await this.chatRoomListService.verifyPassword(
      body.chid,
      body.password,
    );
    return ret;
  }
}
