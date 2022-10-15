import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UserEntity } from 'src/database/entity/entity.user';
import { AuthService } from '../auth/auth.service';
import { DatabaseService } from '../database/database.service';
import { DmService } from './dm.service';

interface testType {
  one: string;
  two?: string;
}

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4242',
  },
})
export class DmGateway {
  constructor(private readonly dmService: DmService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('test')
  handleTest(@MessageBody() data: testType): void {
    this.server.emit('test');
    console.log(data);
    console.log(data.one);
    // console.log(data.two);
  }

  async updateUserStatus(uid: number, user: UserEntity) {
    const followerList = await this.dmService.getFollowerList(uid);
    followerList.forEach((follower) => {
      const { uid, displayName, imgUri, rating, status } = user;
      this.server
        .to(`dm${follower.follower.uid}`)
        .emit('dm/status', { uid, displayName, imgUri, rating, status });
    });
  }
}
