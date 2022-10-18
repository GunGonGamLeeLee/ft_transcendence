import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
import { UserInChannelDto } from 'src/database/dto/user.in.channel.dto';
import { ChannelMode } from 'src/database/entity/entity.channel';
import { MyUid } from 'src/users/decorator/uid.decorator';
import { ChatGateway } from './chat.gateway';
import { ChatRoomListService } from './chat.room.list.service';
import { ChatRoomUsersService } from './chat.room.users.service';
import { ChatService } from './chat.service';
import { ChannelCreateDto } from './dto/channel.create.dto';
import { ChannelPasswordDto } from './dto/channel.password.dto';

@UseGuards(AuthGuard)
@ApiTags('Chat')
@ApiBearerAuth('access-token')
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatRoomListService: ChatRoomListService,
    private readonly chatRoomUsersService: ChatRoomUsersService,
    private readonly chatGateway: ChatGateway,
    private readonly chatService: ChatService,
  ) {}

  //NOTE - GET
  @ApiOperation({ summary: '방 정보 가져오기' })
  @Get('channel')
  async roomList(@MyUid() uid) {
    const ret = await this.chatRoomListService.getRoomList(uid);
    return ret;
  }

  @ApiOperation({ summary: '방의 유저 정보 가져오기' })
  @ApiQuery({ name: 'chid' })
  @Get('channelusers')
  async roomUsers(@Query('chid', ParseIntPipe) chid) {
    const ret = await this.chatRoomUsersService.getRoomUsers(chid);
    return ret;
  }

  // NOTE - Post

  @ApiOperation({ summary: '채팅방 비밀번호 인증하기' })
  @Post('pwd')
  async verifyPassword(@Body() body: ChannelPasswordDto) {
    const ret = await this.chatRoomListService.verifyPassword(body);
    if (ret === false) {
      throw new HttpException('일치하지 않습니다.', HttpStatus.FORBIDDEN);
    }
    return ret;
  }

  @ApiOperation({ summary: '방 생성하기' })
  @Post('channel')
  async newRoom(@MyUid() uid, @Body() body: ChannelCreateDto) {
    if (body.mode === ChannelMode.protected && body.password.length !== 4) {
      throw new HttpException(
        '비밀번호는 4글자이어야 합니다.',
        HttpStatus.FORBIDDEN,
      );
    }
    if (body.mode !== ChannelMode.protected && body.password.length !== 0) {
      throw new HttpException(
        '비밀번호는 4글자이어야 합니다.',
        HttpStatus.FORBIDDEN,
      );
    }
    const ret = await this.chatRoomListService.createRoom(
      uid,
      body.title,
      body.mode,
      body.password,
    );
    return this.chatRoomListService.getCreatedRoom(ret);
  }

  @ApiOperation({ summary: '유저 초대하기' })
  @Post('invite')
  async inviteUser(@MyUid() uid, @Body() body: UserInChannelDto) {
    if (await this.chatService.isInBlockList(body.uid, uid))
      throw new HttpException('초대에 실패했습니다.', HttpStatus.FORBIDDEN);

    await this.chatGateway.handleInvitation(body);
  }
}
