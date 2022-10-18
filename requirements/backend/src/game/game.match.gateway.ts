import { UseFilters, UsePipes } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { WsValidationPipe } from '../ws.validation.pipe';
import { WsExceptionFilter } from '../ws.exception.filter';
import { Socket, Server } from 'socket.io';
import { GameMatchService } from './game.match.service';
import { DatabaseService } from 'src/database/database.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4242',
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
    if (payload.speed < 0.49 || payload.speed > 4.1) {
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

  handleConnection(client: Socket) {
    // console.log('Connect match ' + client.id);
  }

  handleDisconnect(client: Socket) {
    // console.log('D Game');
    this.gameMatchService.matchUnregister(client);
    // console.log('match unregistered ' + client.id);
  }
}
