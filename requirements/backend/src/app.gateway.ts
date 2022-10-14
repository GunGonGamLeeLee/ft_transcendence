import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { isString } from 'class-validator';
import { string } from 'joi';
import { Server, Socket } from 'socket.io';
import { FriendListEntity } from './database/entity/entity.friend.list';
import { DmGateway } from './dm/dm.gateway';
import { DmService } from './dm/dm.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4242',
  },
})
export class AppGateway {
  constructor(private readonly dmService: DmService) {}

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
    // console.log(user);
    if (!user) client.disconnect();
    client.data = { uid: user.uid, status: user.status };

    // dm + uid 방에 자동 입장
    client.join(`dm${client.data.uid}`);
    console.log(this.server.of('/').adapter.sids); // key로 socket.id, value로 들어가있는 방 정보 확인

    const friendList = await this.dmService.getFriendList(client.data.uid);
    this.server.to(client.id).emit('dm/status', friendList);
    console.log(friendList);

    // 친구들에게 현재 상태(online) 보내기 (dm + uid로 보내기)
    const { uid, displayName, imgUri, rating, status } = user;
    friendList.forEach((friend) => {
      this.server
        .to(`dm${friend.user.uid}`)
        .emit('dm/status', { uid, displayName, imgUri, rating, status });
    });
  }

  async handleDisconnect(client: Socket) {}
}
