import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { MyUid } from 'src/users/decorator/uid.decorator';
import { ChatRoomListService } from './chat.room.list.service';

@UseGuards(AuthGuard)
@ApiTags('Chat')
@ApiBearerAuth('access-token')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatRoomListService: ChatRoomListService) {}

  //NOTE - GET
  @ApiOperation({ summary: '방 정보 가져오기' })
  @Get('roomlist')
  async roomlist(@MyUid() uid) {
    const ret = await this.chatRoomListService.getRoomList(uid);
    return ret;
  }
}
