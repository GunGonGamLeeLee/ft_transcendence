import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { isString } from 'class-validator';
import { string } from 'joi';
import { Server, Socket } from 'socket.io';
import { FriendListEntity } from './database/entity/entity.friend.list';
import { UserStatus } from './database/entity/entity.user';
import { DmGateway } from './dm/dm.gateway';
import { DmService } from './dm/dm.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4242',
  },
})
export class AppGateway {
  constructor(
    private readonly dmService: DmService,
    private readonly dmGateway: DmGateway,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    // FIXME 주석 정리 필요!
    ////////////// postman과 같이 사용할 때 필요한 부분 //////////////
    let token = client.handshake.headers.token;
    if (token === undefined) token = client.handshake.auth.token;
    if (!isString(token)) token = token[0];
    //////////////////////////////////////////////////////////////////
    // const { token } = client.handshake.auth; // 실제 사용

    const { user } = await this.dmService.validateUser(token);
    if (!user) client.disconnect();
    client.data = { uid: user.uid, status: user.status };

    // dm + uid 방에 자동 입장
    client.join(`dm${client.data.uid}`);
    // console.log(this.server.of('/').adapter.sids); // key로 socket.id, value로 들어가있는 방 정보 확인

    // follower에게 현재 상태(online) 보내기 (dm + uid로 보내기)
    await this.dmGateway.updateUserStatus(client.data.uid, user);
  }

  async handleDisconnect(client: Socket) {
    await this.dmService.updateUserStatus(client.data.uid, UserStatus.OFFLINE);
    const user = await this.dmService.getUser(client.data.uid);
    await this.dmGateway.updateUserStatus(client.data.uid, user);
    console.log(this.server.of('/').adapter.sids);
  }
}
