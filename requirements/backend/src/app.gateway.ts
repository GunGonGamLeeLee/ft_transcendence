import { UseFilters, UsePipes } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { isString } from 'class-validator';
import { Server, Socket } from 'socket.io';
import { UserStatus } from './database/entity/entity.user';
import { DmGateway } from './dm/dm.gateway';
import { DmService } from './dm/dm.service';
import { WsExceptionFilter } from './ws.exception.filter';
import { WsValidationPipe } from './ws.validation.pipe';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4242',
  },
})
@UsePipes(new WsValidationPipe())
@UseFilters(new WsExceptionFilter())
export class AppGateway {
  constructor(
    private readonly dmService: DmService,
    private readonly dmGateway: DmGateway,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    await this.validateUser(client);
    client.join(`dm${client.data.uid}`);
    // FIXME 테스트용.
    // if (client.data.uid === 85355) {
    //   client.join(`channel20`);
    //   console.log(`socketInit: ${client.data.uid} join channel20`);
    // }
    console.log(`socketInit: ${client.data.uid} join dm${client.data.uid}`);
    await this.dmGateway.updateUser(client.data.uid);
  }

  async handleDisconnect(client: Socket) {
    if (client.data.uid === undefined) return;
    await this.dmService.updateUserStatus(client.data.uid, UserStatus.OFFLINE);
    await this.dmGateway.updateUser(client.data.uid);
    console.log(this.server.of('/').adapter.sids);
  }

  private async validateUser(client: Socket) {
    const token = this.getToken(client);
    const user = await this.dmService.validateUser(token);

    if (!user) {
      client.disconnect();
      return;
    }

    client.data = { uid: user.uid, status: user.status };
  }

  private getToken(client: Socket) {
    // FIXME 주석 정리 필요!
    ////////////// postman과 같이 사용할 때 필요한 부분 //////////////
    let token = client.handshake.headers.token;
    if (token === undefined) token = client.handshake.auth.token;
    if (!isString(token)) token = token[0];
    //////////////////////////////////////////////////////////////////
    // const { token } = client.handshake.auth; // 실제 사용
    return token;
  }
}
