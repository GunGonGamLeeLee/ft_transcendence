import { UseFilters, UsePipes } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { WsExceptionFilter } from 'src/ws.exception.filter';
import { WsValidationPipe } from 'src/ws.validation.pipe';
import { UserRoleInChannel } from 'src/database/entity/entity.user.in.channel';
import { ChatRoleDto } from './dto/chat.role.dto';
import { ChatMessageDto } from './dto/chat.message.dto';
import { ChatPasswordDto } from './dto/chat.password.dto';
import { ChatDeleteStateDto } from './dto/chat.delete.state.dto';

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
  server: Server;

  //msg, msg: string - send message
  @SubscribeMessage('chat/msg')
  chatHandleChatMessage(@MessageBody() payload: ChatMessageDto) {
    this.server.emit('chat/msg', payload.chid, payload.msg, payload.myUid);
  }

  // addAdmin, uid: number - add admin
  @SubscribeMessage('chat/addAdmin')
  async chatHandleAddAdmin(@MessageBody() payload: ChatRoleDto) {
    await this.chatService.changeUserRoleInChannel(
      payload.myUid,
      payload.targetUid,
      payload.chid,
      UserRoleInChannel.ADMIN,
    );
    this.server.emit('chat/addAdmin', payload.chid, payload.targetUid);
  }

  // deleteAdmin, uid - delete admin
  @SubscribeMessage('chat/deleteAdmin')
  async chatHandleDeleteAdmin(@MessageBody() payload: ChatRoleDto) {
    await this.chatService.changeUserRoleInChannel(
      payload.myUid,
      payload.targetUid,
      payload.chid,
      UserRoleInChannel.USER,
    );
    this.server.emit('chat/deleteAdmin', payload.chid, payload.targetUid);
  }

  // addMute, uid - mute user
  @SubscribeMessage('chat/addMute')
  async chatHandleAddMute(@MessageBody() payload: ChatRoleDto) {
    await this.chatService.muteUserInChannel(
      payload.myUid,
      payload.targetUid,
      payload.chid,
    );
    this.server.emit('chat/addMute', payload.chid, payload.targetUid);
  }

  // addBan, uid - ban user
  @SubscribeMessage('chat/addBan')
  async chatHandleAddBan(@MessageBody() payload: ChatRoleDto) {
    await this.chatService.banUserInChannel(
      payload.myUid,
      payload.targetUid,
      payload.chid,
    );
    this.server.emit('chat/addBan', payload.chid, payload.targetUid);
  }

  // password, 4글자 스트링 | 빈 스트링 - 4글자 스트링이면 비밀번호 추가, 반대의 경우 삭제
  @SubscribeMessage('chat/password')
  async chatHandlePassword(@MessageBody() payload: ChatPasswordDto) {
    if (payload.password === '') {
      await this.chatService.updateChRemovePassword(payload.myUid, payload.chid);
    } else {
      await this.chatService.updateChSetPassword(
        payload.myUid,
        payload.chid,
        payload.password,
      );
    }
    this.server.emit('chat/password', payload.chid);
  }

  // announce, msg: string - 공지
  @SubscribeMessage('chat/announce')
  handleAnnounce(@MessageBody() payload: ChatMessageDto) {
    this.server.emit('chat/announce', payload.chid, payload.myUid, payload.msg);
  }

  // deleteMute, targetUid - unmute user, 채팅방 관리자들에게 전부 알려야함
  @SubscribeMessage('chat/deleteMute')
  handleDeleteMute(@MessageBody() payload: ChatDeleteStateDto) {
    this.server.emit('chat/deleteMute', payload.chid, payload.targetUid);
  }

  // deleteBan, targetUid - unban user, 위와 같음
  @SubscribeMessage('chat/deleteBan')
  handleDeleteBan(@MessageBody() payload: ChatDeleteStateDto) {
    this.server.emit('chat/deleteBan', payload.chid, payload.targetUid);
  }
}
