import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { DatabaseService } from '../database/database.service';

@WebSocketGateway({
  namespace: 'dm',
  cors: {
    origin: 'http://localhost:4242',
  },
})
export class DmGateway {
  constructor(
    private readonly authService: AuthService,
    private readonly database: DatabaseService,
  ) {}

  @WebSocketServer()
  server: Namespace;

  async handleConnection(client: Socket) {
    // validate user
    const { token } = client.handshake.auth;
    const { id } = this.authService.verify(token);
    const user = await this.database.findOneUser(id);
    // console.log(user);
    if (!user) client.disconnect();

    // dm + uid 방에 자동 입장
    client.join(`dm${id}`);
    console.log(this.server.adapter.sids); // key로 socket.id, value로 들어가있는 방 정보 확인

    // db에서 친구목록 받아오면서 친구들 상태 확인
    const friendList = await this.database.listUserFriendWithInfo(id);
    const statusList = friendList.map((friend) => {
      return { uid: friend.user.uid, status: friend.user.status };
    });
    console.log(statusList);
    this.server.to(client.id).emit('status', statusList);

    // 친구들에게 접속 상황 보내기 (dm + uid로 보내기), status 1: online
    statusList.forEach((friend) => {
      this.server
        .to(`dm${friend.uid}`)
        // .to(`dm85355`)
        .emit('status online', [{ uid: id, status: 1 }]);
    });
  }

  handleDisconnect() {}
}
