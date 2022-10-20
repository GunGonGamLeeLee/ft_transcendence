import { UseFilters, UsePipes } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { WsExceptionFilter } from 'src/ws.exception.filter';
import { WsValidationPipe } from 'src/ws.validation.pipe';
import { UserRoleInChannel } from 'src/database/entity/entity.user.in.channel';
import { ChatRoleDto } from './dto/chat.role.dto';
import { ChatMessageDto } from './dto/chat.message.dto';
import { ChannelUpdateDto } from './dto/channel.update.dto';
import { ChatDeleteStateDto } from './dto/chat.delete.state.dto';
import { UserInChannelDto } from 'src/database/dto/user.in.channel.dto';
import { ChatRoomListService } from './chat.room.list.service';
import * as dotenv from 'dotenv';

dotenv.config({
  path:
    process.env.NODE_ENV === 'dev' ? '/dev.backend.env' : '/prod.backend.env',
});

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND,
  },
})
@UseFilters(new WsExceptionFilter())
@UsePipes(new WsValidationPipe())
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatRoomListService: ChatRoomListService,
  ) {}
  @WebSocketServer()
  server: Server;

  //msg, msg: string - send message
  @SubscribeMessage('chat/msg')
  handleChatMessage(@MessageBody() payload: ChatMessageDto) {
    this.server
      .to(`channel${payload.chid}`)
      .emit('chat/msg', payload.chid, payload.msg, payload.myUid);
  }

  // addAdmin, uid: number - add admin
  @SubscribeMessage('chat/addAdmin')
  async handleAddAdmin(@MessageBody() payload: ChatRoleDto) {
    await this.chatService.changeUserRoleInChannel(
      payload.myUid,
      payload.targetUid,
      payload.chid,
      UserRoleInChannel.ADMIN,
    );
    this.server
      .to(`channel${payload.chid}`)
      .emit('chat/addAdmin', payload.chid, payload.targetUid);
  }

  // deleteAdmin, uid - delete admin
  @SubscribeMessage('chat/deleteAdmin')
  async handleDeleteAdmin(@MessageBody() payload: ChatRoleDto) {
    await this.chatService.changeUserRoleInChannel(
      payload.myUid,
      payload.targetUid,
      payload.chid,
      UserRoleInChannel.USER,
    );
    this.server
      .to(`channel${payload.chid}`)
      .emit('chat/deleteAdmin', payload.chid, payload.targetUid);
  }

  // addMute, uid - mute user
  @SubscribeMessage('chat/addMute')
  async handleAddMute(client: Socket, payload: ChatRoleDto) {
    const muteUsers = await this.chatService.listMuteUserInChannel(
      payload.chid,
    );

    for (const muteUser of muteUsers) {
      if (muteUser.uid === payload.targetUid) return;
    }

    await this.chatService.muteUserInChannel(
      payload.myUid,
      payload.targetUid,
      payload.chid,
    );
    this.server
      .to(`channel${payload.chid}`)
      .emit('chat/addMute', payload.chid, payload.targetUid);
    console.log(`chat.gateway: handleAddMute: mute ${payload.targetUid}`);
    setTimeout(this.handleDeleteMute.bind(this), 10000, client, {
      targetUid: payload.targetUid,
      chid: payload.chid,
    });
  }

  // addBan, uid - ban user
  @SubscribeMessage('chat/addBan')
  async handleAddBan(client: Socket, payload: ChatRoleDto) {
    const banUsers = await this.chatService.listBanUserInChannel(payload.chid);

    for (const banUser of banUsers) {
      if (banUser.uid === payload.targetUid) return;
    }

    await this.chatService.banUserInChannel(
      payload.myUid,
      payload.targetUid,
      payload.chid,
    );
    this.server
      .to(`channel${payload.chid}`)
      .emit('chat/addBan', payload.chid, payload.targetUid);
    console.log(`chat.gateway: handleAddBan: ban ${payload.targetUid}`);

    const sockets = await this.server
      .in(`channel${payload.chid}`)
      .fetchSockets();
    for (const socket of sockets) {
      if (socket.data.uid === payload.targetUid)
        socket.leave(`channel${payload.chid}`);
    }

    setTimeout(this.handleDeleteBan.bind(this), 10000, client, {
      targetUid: payload.targetUid,
      chid: payload.chid,
    });
  }

  // updateChannel
  @SubscribeMessage('chat/updateChannel')
  async handleUpdateChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: ChannelUpdateDto,
  ) {
    const updateChannel = await this.chatService.updateChannel(
      client.data.uid,
      payload,
    );
    const ret = await this.chatRoomListService.getCreatedRoom(updateChannel);
    this.server.to(`channel${payload.chid}`).emit('chat/updateChannel', ret);
  }

  // announce, msg: string - 공지
  @SubscribeMessage('chat/announce')
  handleAnnounce(@MessageBody() payload: ChatMessageDto) {
    this.server
      .to(`channel${payload.chid}`)
      .emit('chat/announce', payload.chid, payload.myUid, payload.msg);
  }

  // deleteMute, targetUid - unmute user, 채팅방 관리자들에게 전부 알려야함
  @SubscribeMessage('chat/deleteMute')
  async handleDeleteMute(client: Socket, payload: ChatDeleteStateDto) {
    await this.chatService.unmuteUserInChannel(
      client.data.uid,
      payload.targetUid,
      payload.chid,
    );
    console.log(`chat.gateway: handleDeleteMute: unmute ${payload.targetUid}`);
    this.server
      .to(`channel${payload.chid}`)
      .emit('chat/deleteMute', payload.chid, payload.targetUid);
  }

  // deleteBan, targetUid - unban user, 위와 같음
  @SubscribeMessage('chat/deleteBan')
  async handleDeleteBan(client: Socket, payload: ChatDeleteStateDto) {
    await this.chatService.unbanUser(
      client.data.uid,
      payload.targetUid,
      payload.chid,
    );
    console.log(`chat.gateway: handleDeleteBan: unban ${payload.targetUid}`);
    this.server
      .to(`channel${payload.chid}`)
      .emit('chat/deleteBan', payload.chid, payload.targetUid);
  }

  // chat/addUserInChannel - 채널에 들어가기
  @SubscribeMessage('chat/addUserInChannel')
  async handleAddUserInChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: UserInChannelDto,
  ) {
    const user: UserInChannelDto = {
      uid: payload.uid,
      chid: payload.chid,
      role: UserRoleInChannel.USER,
      isMute: false,
      isBan: false,
    };

    await client.join(`channel${payload.chid}`);
    const ret = await this.chatService.addUserInChannel(user);
    this.server.to(`channel${payload.chid}`).emit('chat/addUserInChannel', ret);
  }

  // chat/deleteUserInChannel - 채널에서 나가기
  @SubscribeMessage('chat/deleteUserInChannel')
  async handleDeleteUserInChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: UserInChannelDto,
  ) {
    await client.leave(`channel${payload.chid}`);
    await this.chatService.deleteUserInChannel(payload.uid, payload.chid);
    this.server
      .to(`channel${payload.chid}`)
      .emit('chat/deleteUserInChannel', payload.uid);
  }

  async handleInvitation(payload: UserInChannelDto) {
    const user: UserInChannelDto = {
      uid: payload.uid,
      chid: payload.chid,
      role: UserRoleInChannel.USER,
      isMute: false,
      isBan: false,
    };

    const sockets = await this.server.in(`dm${payload.uid}`).fetchSockets();
    for (const socket of sockets) {
      if (socket.data.uid === payload.uid)
        socket.join(`channel${payload.chid}`);
    }
    const ret = await this.chatService.addUserInChannel(user);
    this.server.to(`channel${payload.chid}`).emit('chat/addUserInChannel', ret);
  }
}
