import { UseFilters, UsePipes } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { isString } from 'class-validator';
import { Server, Socket } from 'socket.io';
import { UserStatus } from './database/entity/entity.user';
import { DmGateway } from './dm/dm.gateway';
import { DmService } from './dm/dm.service';
import { WsExceptionFilter } from './ws.exception.filter';
import { WsValidationPipe } from './ws.validation.pipe';
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
@UsePipes(new WsValidationPipe())
@UseFilters(new WsExceptionFilter())
export class AppGateway {
  constructor(
    private readonly dmService: DmService,
    private readonly dmGateway: DmGateway,
  ) {}

  private sockets = new Set();
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    try {
      await this.validateUser(client);
    } catch (e) {
      console.log(e.error);
      client.disconnect();
    }

    if (client.data.uid === undefined) return;
    client.join(`dm${client.data.uid}`);
    console.log(
      `socketInit: ${client.data.uid} join dm${client.data.uid} (${client.id})`,
    );
    await this.dmGateway.updateUser(client.data.uid);
  }

  async handleDisconnect(client: Socket) {
    if (client.data.uid === undefined) return;
    await this.dmService.updateUserStatus(client.data.uid, UserStatus.OFFLINE);
    await this.dmGateway.updateUser(client.data.uid);
    this.sockets.delete(client.data.uid);
    // console.log(this.server.of('/').adapter.sids);
  }

  private async validateUser(client: Socket) {
    const token = this.getToken(client);
    const user = await this.dmService.validateUser(token);
    if (user == null || user == undefined)
      throw new WsException('잘못된 사용자입니다.');
    const alreadyExist = this.sockets.has(user.uid);

    client.emit('login/dupCheck', !alreadyExist);
    if (!user || alreadyExist) {
      client.disconnect();
      return;
    }
    this.sockets.add(user.uid);
    client.data = { uid: user.uid };
  }

  private getToken(client: Socket) {
    const token = client.handshake.auth.token;
    return token;
  }
}
