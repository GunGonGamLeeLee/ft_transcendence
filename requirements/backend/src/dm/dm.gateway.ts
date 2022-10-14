import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { DatabaseService } from '../database/database.service';

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
  constructor(
    private readonly authService: AuthService,
    private readonly database: DatabaseService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('test')
  handleTest(@MessageBody() data: testType): void {
    this.server.emit('test');
    console.log(data);
    console.log(data.one);
    // console.log(data.two);
  }
}
