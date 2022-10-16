import { UseFilters, UsePipes } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { UserRoleInChannel } from 'src/database/entity/entity.user.in.channel';
import { WsExceptionFilter } from 'src/ws.exception.filter';
import { WsValidationPipe } from 'src/ws.validation.pipe';
import { ChatDeleteStateDto } from './chat.delete.state.dto';
import { ChatMessageDto } from './dto/chat.message.dto';
import { ChatPasswordDto } from './dto/chat.password.dto';
import { ChatRoleDto } from './dto/chat.role.dto';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:4242'],
  },
})
@UseFilters(new WsExceptionFilter())
@UsePipes(new WsValidationPipe())
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  chat: Server;

  //msg, msg: string - send message
  @SubscribeMessage('chat/msg')
  chatHandleChatMessage(@MessageBody() data: ChatMessageDto) {
    this.chat.emit('chat/msg', data.roomId, data.msg, data.myUid);
  }

  // addAdmin, uid: number - add admin
  @SubscribeMessage('chat/addAdmin')
  async chatHandleAddAdmin(@MessageBody() data: ChatRoleDto) {
    await this.chatService.changeUserRoleInChannel(
      data.myUid,
      data.targetUid,
      data.roomId,
      UserRoleInChannel.ADMIN,
    );
    this.chat.emit('chat/addAdmin', data.roomId, data.targetUid);
  }

  // deleteAdmin, uid - delete admin
  @SubscribeMessage('chat/deleteAdmin')
  async chatHandleDeleteAdmin(@MessageBody() data: ChatRoleDto) {
    await this.chatService.changeUserRoleInChannel(
      data.myUid,
      data.targetUid,
      data.roomId,
      UserRoleInChannel.USER,
    );
    this.chat.emit('chat/deleteAdmin', data.roomId, data.targetUid);
  }

  // addMute, uid - mute user
  @SubscribeMessage('chat/addMute')
  async chatHandleAddMute(@MessageBody() data: ChatRoleDto) {
    await this.chatService.muteUserInChannel(
      data.myUid,
      data.targetUid,
      data.roomId,
    );
    this.chat.emit('chat/addMute', data.roomId, data.targetUid);
  }

  // addBan, uid - ban user
  @SubscribeMessage('chat/addBan')
  async chatHandleAddBan(@MessageBody() data: ChatRoleDto) {
    await this.chatService.banUserInChannel(
      data.myUid,
      data.targetUid,
      data.roomId,
    );
    this.chat.emit('chat/addBan', data.roomId, data.targetUid);
  }

  // password, 4글자 스트링 | 빈 스트링 - 4글자 스트링이면 비밀번호 추가, 반대의 경우 삭제
  @SubscribeMessage('chat/password')
  async chatHandlePassword(@MessageBody() data: ChatPasswordDto) {
    if (data.password === '') {
      await this.chatService.updateChRemovePassword(data.myUid, data.roomId);
    } else {
      await this.chatService.updateChSetPassword(
        data.myUid,
        data.roomId,
        data.password,
      );
    }
    this.chat.emit('chat/password', data.roomId);
  }

  // announce, msg: string - 공지
  @SubscribeMessage('chat/announce')
  handleAnnounce(@MessageBody() data: ChatMessageDto) {
    this.chat.emit('chat/announce', data.roomId, data.myUid, data.msg);
  }

  // deleteMute, targetUid - unmute user, 채팅방 관리자들에게 전부 알려야함
  @SubscribeMessage('chat/deleteMute')
  handleDeleteMute(@MessageBody() data: ChatDeleteStateDto) {
    this.chat.emit('chat/deleteMute', data.roomId, data.targetUid);
  }

  // deleteBan, targetUid - unban user, 위와 같음
  @SubscribeMessage('chat/deleteBan')
  handleDeleteBan(@MessageBody() data: ChatDeleteStateDto) {
    this.chat.emit('chat/deleteBan', data.roomId, data.targetUid);
  }
}
