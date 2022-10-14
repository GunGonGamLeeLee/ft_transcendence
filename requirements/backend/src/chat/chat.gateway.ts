import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DatabaseService } from 'src/database/database.service';
import { UserRoleInChannel } from 'src/database/entity/entity.user.in.channel';
import { ChatMassageDto } from './chat.massage.dto';
import { ChatDto } from './chat.dto';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:4242'],
  },
})
export class ChatGateway {
  constructor(private readonly database: DatabaseService) {}
  @WebSocketServer()
  chat: Server;

  afterInit() {}

  handleConnection(
    // @ConnectedSocket() client: Socket,
    // @MessageBody() roomName: string,
  ) {
    // console.log(`id: ${client.id} 입장 📥`);
    // client.join(roomName);
    // client.broadcast.to(roomName).emit('enter user', client.id);
  } //소켓 연결 (접속)

  handleDisconnect(
    // @ConnectedSocket() client: Socket,
    // @MessageBody() roomName: string,
  ) {
    // console.log(`id: ${client.id} 퇴장 📤`);
    // client.leave(roomName);
    // client.broadcast.to(roomName).emit('leave user', client.id);
  } //소켓 끊김

  //msg, msg: string - send message
  @SubscribeMessage('chatMsg')
  chatHandleChatMessage(@MessageBody() data: ChatDto) {
    const msg = data.msg;
    const uid = data.myUid;
    this.chat.to(data.roomName).emit('chatMsg', <ChatMassageDto>{ msg, uid });
  }

  // addAdmin, uid: number - add admin
  @SubscribeMessage('chatAddAdmin')
  async chatHandleAddAdmin(@MessageBody() data: ChatDto) {
    const isSuccess = await this.database.changeUserRoleInChannel(
      data.myUid,
      data.targetUid,
      data.roomId,
      UserRoleInChannel.ADMIN,
    );
    if (isSuccess)
      this.chat.to(data.roomName).emit('chatAddAdmin', data.targetUid);
  }

  // deleteAdmin, uid - delete admin
  @SubscribeMessage('chatDeleteAdmin')
  async chatHandleDeleteAdmin(@MessageBody() data: ChatDto) {
    const isSuccess = await this.database.changeUserRoleInChannel(
      data.myUid,
      data.targetUid,
      data.roomId,
      UserRoleInChannel.USER,
    );
    if (isSuccess)
      this.chat.to(data.roomName).emit('chatDeleteAdmin', data.targetUid);
  }

  // addMute, uid - mute user
  @SubscribeMessage('chatAddMute')
  async chatHandleAddMute(@MessageBody() data: ChatDto) {
    const isSuccess = await this.database.muteUserInChannel(
      data.myUid,
      data.targetUid,
      data.roomId,
    );
    if (isSuccess)
      this.chat.to(data.roomName).emit('chatAddMute', data.targetUid);
  }

  // addBan, uid - ban user
  @SubscribeMessage('chatAddBan')
  async chatHandleAddBan(@MessageBody() data: ChatDto) {
    const isSuccess = await this.database.banUserInChannel(
      data.myUid,
      data.targetUid,
      data.roomId,
    );
    if (isSuccess)
      this.chat.to(data.roomName).emit('chatAddBan', data.targetUid);
  }

  // password, 4글자 스트링 | 빈 스트링 - 4글자 스트링이면 비밀번호 추가, 반대의 경우 삭제
  @SubscribeMessage('chatPassword')
  async chatHandlePassword(@MessageBody() data: ChatDto) {
    let isSuccess;

    if (data.password === '') {
      isSuccess = await this.database.updateChRemovePassword(
        data.myUid,
        data.roomId,
      );
    } else {
      isSuccess = await this.database.updateChSetPassword(
        data.myUid,
        data.roomId,
        data.password,
      );
    }

    if (isSuccess) this.chat.emit('chatPassword', data.roomId);
  }

  // announce, msg: string - 공지
  @SubscribeMessage('chatAnnounce')
  handleAnnounce(@MessageBody() data: ChatDto) {
    this.chat.to(data.roomName).emit('chatAnnounce', data.msg);
  }

  // deleteMute, targetUid - unmute user, 채팅방 관리자들에게 전부 알려야함
  @SubscribeMessage('chatDeleteMute')
  handleDeleteMute(@MessageBody() data: ChatDto) {
    // const adminList = this.database.listAdminInChannel(roomId);
    // this.chat.to(data.roomName).to(adminList).emit('chatDeleteMute', targetUid);
    this.chat.to(data.roomName).emit('chatDeleteMute', data.targetUid);
  }

  // deleteBan, targetUid - unban user, 위와 같음
  @SubscribeMessage('chatDeleteBan')
  handleDeleteBan(@MessageBody() data: ChatDto) {
    this.chat.to(data.roomName).emit('chatDeleteBan', data.targetUid);
  }
}
