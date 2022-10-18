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

  constructor(private gameMatchService: GameMatchService) {}

  @SubscribeMessage('game/match')
  matchWaiting(client: Socket, payload: any) {
    // payload 쓸데 있나..?
    // waiting queue에 등록.
    console.log(client.id);
    this.gameMatchService.matchRegister(client);
  }

  @SubscribeMessage('game/invite')
  inviteUser(client: Socket, payload: { uid: number; speed: number }) {
    this.gameMatchService.inviteUser(client, payload);
  }

  @SubscribeMessage('game/invited')
  invitedUser(client: Socket, payload: { uid: number }) {
    this.gameMatchService.invitedUser(client, payload);
  }

  handleConnection(client: Socket) {
    console.log('Connect match ' + client.id);
  }

  handleDisconnect(client: Socket) {
    // console.log('D Game');
    this.gameMatchService.matchUnregister(client);
    // console.log('match unregistered ' + client.id);
  }
}
