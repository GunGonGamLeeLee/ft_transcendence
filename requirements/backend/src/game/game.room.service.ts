import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { DatabaseService } from 'src/database/database.service';
import {
  GameRoomInfo,
  GameRoomState,
  Code,
  UserGameRoomState,
  StartGameRoomState,
} from './game.room.dto';

interface GameEndInfo {
  roomId: string;
  winer: Socket;
  loser: Socket;
  broadcast: NodeJS.Timeout;
}

const GameInfo = {
  width: 640,
  height: 360,
  paddlex: 10,
  paddley: 80,
  maxy: (360 - 80) / 2, // (height - paddley) / 2
  ballr: 10,
};

@Injectable()
export class GameRoomService {
  constructor(private readonly database: DatabaseService) {}
  private roomInfos: GameRoomInfo[] = [];
  private lastId: number = 1;

  private async makeGameRoomInfo(
    player1: Socket,
    player2: Socket,
    mode: number,
    speed: number,
  ): Promise<GameRoomInfo> {
    const roomId: string = (this.lastId++).toString();

    const roomInfo: GameRoomInfo = {
      roomId: roomId,
      mode: mode,
      speed: speed,
      player1: player1,
      player2: player2,
      profile1: await this.database.findOneUserSmallProfile(player1.data.uid),
      profile2: await this.database.findOneUserSmallProfile(player2.data.uid),
      crowd: [],
      state: {
        keyState1: 0,
        keyState2: 0,
        paddle1: 0,
        paddle2: 0,
        ball: { x: 0, y: 0, dx: -5, dy: 2 },
        score1: 0,
        score2: 0,
      },
      broadcast: null,
    };

    // console.log(`game.room.service.ts:makeGameRoomInfo: ${roomId}`);
    return roomInfo;
  }

  makeStartState(roomInfo: GameRoomInfo) {
    const startState: StartGameRoomState = {
      profile1: roomInfo.profile1,
      profile2: roomInfo.profile2,
      paddle1: roomInfo.state.paddle1,
      paddle2: roomInfo.state.paddle2,
      ballx: roomInfo.state.ball.x,
      bally: roomInfo.state.ball.y,
      score1: roomInfo.state.score1,
      score2: roomInfo.state.score2,
    };

    return startState;
  }

  async createRoom(
    player1: Socket,
    player2: Socket,
    mode: number,
    speed: number,
  ) {
    const roomInfo: GameRoomInfo = await this.makeGameRoomInfo(
      player1,
      player2,
      mode,
      speed,
    );
    const roomId = roomInfo.roomId;

    player1.join(roomId.toString());
    player2.join(roomId.toString());
    console.log(player1.id, player2.id);
    player1.data = { ...player1.data, roomId: roomId };
    player2.data = { ...player2.data, roomId: roomId };

    const startState = this.makeStartState(roomInfo);
    player1.emit('game/start', startState);
    player2.emit('game/start', startState);
    // console.log('game/start ' + roomInfo.roomId);

    this.broadcastStateInRoom = this.broadcastStateInRoom.bind(this);
    this.roomInfos[roomId] = roomInfo;
    const broadcast = setInterval(
      this.broadcastStateInRoom,
      25,
      this.roomInfos[roomId],
    ); // micro task ?
    this.roomInfos[roomId].broadcast = broadcast;
  }

  private sendEndingMessageToClient(gameEndInfo: GameEndInfo) {
    const { roomId, winer, loser, broadcast } = gameEndInfo;
    winer.emit('game/end', 'YOU WIN  ^_^');
    loser.emit('game/end', 'YOU LOSE T.T');
    clearInterval(broadcast);
    this.roomInfos[roomId] = null;
    // console.log('game/end');
  }

  broadcastStateInRoom(roomInfo: GameRoomInfo) {
    const { roomId, speed, player1, player2, crowd, state, broadcast } =
      roomInfo;

    // move paddle
    state.paddle1 += state.keyState1 * 4 * 2 * speed;
    state.paddle2 += state.keyState2 * 4 * 2 * speed;

    if (state.paddle1 > GameInfo.maxy) state.paddle1 = GameInfo.maxy;
    else if (state.paddle1 < -GameInfo.maxy) state.paddle1 = -GameInfo.maxy;
    if (state.paddle2 > GameInfo.maxy) state.paddle2 = GameInfo.maxy;
    else if (state.paddle2 < -GameInfo.maxy) state.paddle2 = -GameInfo.maxy;

    // move ball
    state.ball.x += state.ball.dx * 2 * speed;
    state.ball.y += state.ball.dy * 2 * speed;

    // wall
    if (
      state.ball.y >= GameInfo.height / 2 - GameInfo.ballr &&
      state.ball.dy > 0
    ) {
      state.ball.dy *= -1;
      state.ball.y = (GameInfo.height / 2 - GameInfo.ballr) * 2 - state.ball.y;
    } else if (
      state.ball.y <= -(GameInfo.height / 2 - GameInfo.ballr) &&
      state.ball.dy < 0
    ) {
      state.ball.dy *= -1;
      state.ball.y = -(
        (GameInfo.height / 2 - GameInfo.ballr) * 2 +
        state.ball.y
      );
    }
    //  paddle
    if (
      state.ball.x <=
        -(GameInfo.width / 2 - GameInfo.paddlex - GameInfo.ballr) &&
      state.paddle1 - GameInfo.paddley / 2 <= state.ball.y &&
      state.paddle1 + GameInfo.paddley / 2 >= state.ball.y &&
      state.ball.dx < 0
    ) {
      state.ball.x = -(
        (GameInfo.width / 2 - GameInfo.paddlex - GameInfo.ballr) * 2 +
        state.ball.x
      );
      state.ball.dx *= -1;
    } else if (
      state.ball.x >= GameInfo.width / 2 - GameInfo.paddlex - GameInfo.ballr &&
      state.paddle2 - GameInfo.paddley / 2 <= state.ball.y &&
      state.paddle2 + GameInfo.paddley / 2 >= state.ball.y &&
      state.ball.dx > 0
    ) {
      state.ball.x =
        (GameInfo.width / 2 - GameInfo.paddlex - GameInfo.ballr) * 2 -
        state.ball.x;
      state.ball.dx *= -1;
    }
    //end

    if (state.ball.x >= GameInfo.width / 2 - GameInfo.ballr) {
      state.score1 += 1;
      state.paddle1 = 0;
      state.paddle2 = 0;
      state.ball = { x: 0, y: 0, dx: 4, dy: 1 };
    } else if (state.ball.x <= -(GameInfo.width / 2 - GameInfo.ballr)) {
      state.score2 += 1;
      state.paddle1 = 0;
      state.paddle2 = 0;
      state.ball = { x: 0, y: 0, dx: 4, dy: 1 };
    }

    const userGameRoomState: UserGameRoomState = {
      paddle1: state.paddle1,
      paddle2: state.paddle2,
      ballx: state.ball.x,
      bally: state.ball.y,
      score1: state.score1,
      score2: state.score2,
    };

    if (state.score1 >= 3 || state.score2 >= 3) {
      player1.emit('game/end', state);
      player1.leave(roomId);
      player1.data.roomId = null;
      player2.emit('game/end', state);
      player2.leave(roomId);
      player2.data.roomId = null;
      for (const c of crowd) {
        c.emit('game/end', state);
        c.leave(roomId);
        c.data.roomId = null;
      }
      clearInterval(broadcast);
      this.roomInfos[roomId] = null;
    }

    player1.emit('game/state', userGameRoomState);
    player2.emit('game/state', userGameRoomState);
    for (const c of crowd) {
      c.emit('game/state', userGameRoomState);
    }
  }

  updateRoom(client: Socket, payload: Code, keyState: number) {
    const room = client.data.roomId;
    try {
      const { roomId, player1, player2, crowd, state, broadcast } =
        this.roomInfos[room];
      if (player1 === client) {
        state.keyState1 += payload.code * keyState;
      } else if (player2 === client) {
        state.keyState2 += payload.code * keyState;
      }
    } catch (error) {}
  }

  exitRoom(client: Socket) {
    console.log('exit');
    this.loseByDisconnect(client);
  }

  specStart(client: Socket, payload: { roomId: number }) {
    const roomId = payload.roomId.toString();

    const idx = this.roomInfos[roomId].crowd.findIndex(
      (inqueue) => inqueue === client,
    );

    if (idx !== -1) {
      // TO DO 중복 요청
    }

    client.join(roomId);
    client.data = { ...client.data, payload };
    client.emit('game/start', this.makeStartState(this.roomInfos[roomId]));
    this.roomInfos[roomId].crowd.push(client);
  }

  loseByDisconnect(client: Socket) {
    try {
      const room = client.data.roomId;
      const { roomId, player1, player2, crowd, state, broadcast } =
        this.roomInfos[room];
      if (player1 === client || player2 === client) {
        player1.emit('game/end', state);
        player1.leave(roomId);
        player1.data.roomId = null;
        player2.emit('game/end', state);
        player2.leave(roomId);
        player2.data.roomId = null;
        for (const c of crowd) {
          c.emit('game/end', state);
          c.leave(roomId);
          c.data.roomId = null;
        }
        clearInterval(broadcast);
        this.roomInfos[roomId] = null;
      } else {
        const index = crowd.findIndex((crowd) => crowd === client);
        if (index !== -1) {
          crowd.splice(index, 1);
        }
      }
    } catch (error) {}
  }
}
