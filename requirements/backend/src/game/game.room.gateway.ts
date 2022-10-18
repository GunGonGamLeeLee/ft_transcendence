import { UseFilters, UsePipes } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { WsValidationPipe } from '../ws.validation.pipe';
import { WsExceptionFilter } from '../ws.exception.filter';
import { Socket, Server } from 'socket.io';
import { GameRoomService } from './game.room.service';
import { Code } from './game.room.dto';
import { UserStatus } from 'src/database/entity/entity.user';
import { DatabaseService } from 'src/database/database.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4242',
  },
})
@UseFilters(new WsExceptionFilter())
@UsePipes(new WsValidationPipe())
export class GameRoomGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private gameRoomService: GameRoomService,
    private readonly database: DatabaseService,
  ) {}

  @SubscribeMessage('keydown')
  keydown(client: Socket, payload: Code): void {
    this.gameRoomService.updateKeyState(client, payload, 1);
  }

  @SubscribeMessage('keyup')
  keyup(client: Socket, payload: Code): void {
    this.gameRoomService.updateKeyState(client, payload, -1);
  }

  @SubscribeMessage('game/exit')
  exitRoom(client: Socket): void {
    console.log(`game/exit ${client.id}`);
    this.gameRoomService.exitGame(client);
  }

  @SubscribeMessage('game/spec')
  async specStart(client: Socket, payload: { uid: number }) {
    console.log(`game/spec ${client.id}`);
    const sockets = await this.server.in(`dm${payload.uid}`).fetchSockets();
    for (const sock of sockets) {
      if (sock.data.uid == payload.uid) {
        if (sock.data.roomId === undefined) break;
        this.gameRoomService.specStart(client, sock.data.roomId);
        return;
      }
    }
    // except
    client.emit('game/error');
  }

  handleConnection(client: Socket) {
    // console.log('Connect game ' + client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Disconnect match ' + client.id);
    this.database.updateUserStatus(client.data.uid, UserStatus.OFFLINE);
    this.gameRoomService.exitGame(client);
  }
}
