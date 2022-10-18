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
  specStart(client: Socket, payload: { roomId: number }): void {
    console.log(`game/invited ${client.id}`);
    this.gameRoomService.specStart(client, payload);
  }

  handleConnection(client: Socket) {
    // console.log('Connect game ' + client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Disconnect match ' + client.id);
    this.gameRoomService.exitGame(client);
    this.database.updateUserStatus(client.data.uid, UserStatus.OFFLINE);
  }
}
