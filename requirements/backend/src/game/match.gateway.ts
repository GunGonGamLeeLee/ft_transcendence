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
import { MatchMakingService } from './match.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4242',
  },
})
@UseFilters(new WsExceptionFilter())
@UsePipes(new WsValidationPipe())
export class MatchMakingGateway {
  @WebSocketServer()
  server: Server;

  constructor(private matchMakingService: MatchMakingService) {}

  @SubscribeMessage('game/match')
  matchWaiting(client: Socket, payload: any) {
    // payload 쓸데 있나..?
    // waiting queue에 등록.
    console.log(client.id);
    this.matchMakingService.matchRegister(client);
  }

  @SubscribeMessage('game/invite')
  inviteUser(client: Socket, payload: { uid: number; speed: number }) {
    this.matchMakingService.inviteUser(client, payload);
  }

  @SubscribeMessage('game/invited')
  invitedUser(client: Socket, payload: { uid: number }) {
    this.matchMakingService.invitedUser(client, payload);
  }

  handleConnection(client: Socket) {
    console.log('Connect match ' + client.id);
  }

  handleDisconnect(client: Socket) {
    // console.log('D Game');
    this.matchMakingService.matchUnregister(client);
    // console.log('match unregistered ' + client.id);
  }
}
