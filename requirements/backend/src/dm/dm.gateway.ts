import { UseFilters, UsePipes } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserEntity } from 'src/database/entity/entity.user';
import { DmChatDto } from './dm.chat.dto';
import { WsExceptionFilter } from '../ws.exception.filter';
import { DmService } from './dm.service';
import { WsValidationPipe } from '../ws.validation.pipe';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4242',
  },
})
@UseFilters(new WsExceptionFilter())
@UsePipes(new WsValidationPipe())
export class DmGateway {
  constructor(private readonly dmService: DmService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('test')
  handleTest(@MessageBody() data): void {
    throw new WsException(data.one);
    // throw new HttpException(data.one, 400);
  }

  @SubscribeMessage('dm/msg')
  async msg(client: Socket, payload: DmChatDto) {
    await client.join(`dm${payload.targetUid}`);
    this.server.to(`dm${payload.targetUid}`).emit('dm/msg', payload.msg);
    await client.leave(`dm${payload.targetUid}`);
    await this.dmService.addDmLog(
      client.data.uid,
      payload.targetUid,
      payload.msg,
    );
  }

  async updateUserStatus(uid: number, user: UserEntity) {
    const followerList = await this.dmService.getFollowerList(uid);
    for (const follower of followerList) {
      const { uid, displayName, imgUri, rating, status } = user;
      // const userData: UserDataType = { ...user }; // FIXME 이거 왜 안될까?
      this.server
        .to(`dm${follower.fromUid}`)
        .emit('dm/status', { uid, displayName, imgUri, rating, status });
    }
  }
}
