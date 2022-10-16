import { UseFilters, UsePipes } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DmChatDto } from './dm.chat.dto';
import { WsExceptionFilter } from '../ws.exception.filter';
import { DmService } from './dm.service';
import { WsValidationPipe } from '../ws.validation.pipe';
import { UserEntity } from 'src/database/entity/entity.user';

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

  async updateUser(uid: number) {
    const user = await this.dmService.getUser(uid);
    this.updateUserToFriends(user);
    this.updateUserToChannels(user);
  }

  private async updateUserToFriends(user: UserEntity) {
    const { uid, displayName, imgUri, rating, status } = user;
    const followerList = await this.dmService.getFollowerList(uid);
    for (const f of followerList) {
      console.log(`dm/status: ${uid} send status to dm${f.fromUid}`);
      this.server
        .to(`dm${f.fromUid}`)
        .emit('dm/status', { uid, displayName, imgUri, rating, status });
    }
  }

  private async updateUserToChannels(user: UserEntity) {
    const { uid, displayName, imgUri, rating, status } = user;
    const channels = await this.dmService.getChannelsOfUser(uid);
    for (const ch of channels) {
      console.log(`dm/status: ${uid} send status to channel${ch.chid}`);
      this.server
        .to(`channel${ch.chid}`)
        .emit('dm/status', { uid, displayName, imgUri, rating, status });
    }
  }
}
