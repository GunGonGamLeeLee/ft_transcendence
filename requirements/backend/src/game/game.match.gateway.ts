import { UseFilters, UsePipes } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsValidationPipe } from '../ws.validation.pipe';
import { WsExceptionFilter } from '../ws.exception.filter';
import { Socket, Server } from 'socket.io';
import { GameMatchService } from './game.match.service';
import { DatabaseService } from 'src/database/database.service';
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
@UseFilters(new WsExceptionFilter())
@UsePipes(new WsValidationPipe())
export class GameMatchGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private gameMatchService: GameMatchService,
    private readonly database: DatabaseService,
  ) {}

  @SubscribeMessage('game/match')
  match(client: Socket, payload: any) {
    console.log(`game/match ${client.id}`);
    this.gameMatchService.matchRegister(client);
  }

  @SubscribeMessage('game/unmatch')
  unMatch(client: Socket) {
    console.log(`game/unmatch ${client.id}`);
    this.gameMatchService.matchUnregister(client);
  }

  @SubscribeMessage('game/invite')
  async inviteUser(client: Socket, payload: { uid: number; speed: number }) {
    if (payload.speed < 0.5 || payload.speed > 4.0) {
      client.emit('game/error');
    }
    console.log(`game/invite ${client.id}`);
    const sockets = await this.server.in(`dm${payload.uid}`).fetchSockets();
    for (const sock of sockets) {
      if (sock.data.uid == payload.uid) {
        this.gameMatchService.inviteUser(client, payload);
        const user = await this.database.findOneUser(client.data.uid);
        sock.emit('invite/game', {
          uid: client.data.uid,
          displayName: user.displayName,
        });
        return;
      }
    }
    // except
    client.emit('game/error');
  }

  @SubscribeMessage('game/invited')
  invitedUser(client: Socket, payload: { uid: number }) {
    console.log(`game/invited ${client.id}`);
    this.gameMatchService.invitedUser(client, payload);
  }

  handleDisconnect(client: Socket) {
    this.gameMatchService.matchUnregister(client);
  }
}
