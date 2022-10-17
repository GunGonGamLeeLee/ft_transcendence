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
import { GameRoomService } from './game.service';
import { GameRoomState, Code } from './game.dto';

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

  constructor(private gameRoomService: GameRoomService) {}

  @SubscribeMessage('enter-room')
  enterRoom(client: Socket, payload: any): void {
    // 관전자가 룸에 들어갈 때 사용.
    // payload로 유저아이디가 들어옴.
    // sessionInfo = userService.getSessionInfo(payload: userId)
    // const { roomId } = sessionInfo.roomInfo
    // client.join(roomId);
  }

  @SubscribeMessage('keydown')
  keydown(client: Socket, payload: Code): void {
    this.gameRoomService.updateRoom(client, payload, 1);
  }

  @SubscribeMessage('keyup')
  keyup(client: Socket, payload: Code): void {
    this.gameRoomService.updateRoom(client, payload, -1);
  }

  // @SubscribeMessage('update-room')
  // updateRoom(client: Socket, payload: GameRoomState): void {
  //   // 게임의 상태를 업데이트
  //   this.gameRoomService.updateRoom(client, payload);
  // }

  @SubscribeMessage('game/exit')
  exitRoom(client: Socket): void {
    this.gameRoomService.exitRoom(client);
  }

  @SubscribeMessage('spec-start')
  specStart(client: Socket, payload: { roomId: number }): void {
    this.gameRoomService.specStart(client, payload);
  }

  handleConnection(client: Socket) {
    console.log('Connect game ' + client.id);
  }

  handleDisconnect(client: Socket) {
    // 게임 대기 중
    // 게임 중
    // 게임 끝 -> pass
    // console.log('Disconnect match ' + client.id);
    this.gameRoomService.loseByDisconnect(client);
  }
}
