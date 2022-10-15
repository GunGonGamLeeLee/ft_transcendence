import { UsePipes, ValidationPipe } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UserEntity } from 'src/database/entity/entity.user';
import { UserDataType } from 'src/users/dto/user.data.type.dto';
import { DmService } from './dm.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4242',
  },
})
@UsePipes(new ValidationPipe())
export class DmGateway {
  constructor(private readonly dmService: DmService) {}

  @WebSocketServer()
  server: Server;

  async updateUserStatus(uid: number, user: UserEntity) {
    const followerList = await this.dmService.getFollowerList(uid);
    for (const follower of followerList) {
      const { uid, displayName, imgUri, rating, status } = user;
      this.server
        .to(`dm${follower.fromUid}`)
        .emit('dm/status', { uid, displayName, imgUri, rating, status });
    }
  }
}
