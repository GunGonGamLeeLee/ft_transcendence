import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { DatabaseService } from 'src/database/database.service';
import { DmGateway } from 'src/dm/dm.gateway';
import { GameResultService } from './game.result.service';
import {
  GameRoomInfo,
  GameRoomState,
  Code,
  UserGameRoomState,
  StartGameRoomState,
  Ball,
} from './game.room.dto';

const GameInfo = {
  width: 640,
  height: 660,
  paddlex: 10,
  paddley: 80,
  maxy: (660 - 80) / 2, // (height - paddley) / 2
  ballr: 10,
};

@Injectable()
export class GameRoomService {
  constructor(
    private readonly database: DatabaseService,
    private readonly gameResult: GameResultService,
    private readonly dmGateway: DmGateway,
  ) {}
  private roomInfos: GameRoomInfo[] = [];
  private lastId = 1;

  private randomSpeed() {
    const n = Math.random();
    return (3 + n * 3) * ((Math.floor(n * 10) % 2) * 2 - 1);
  }

  private ballInit(): Ball {
    return { x: 0, y: 0, dx: this.randomSpeed(), dy: this.randomSpeed() };
  }

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
        ball: this.ballInit(),
        score1: 0,
        score2: 0,
      },
      broadcast: null,
    };

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

  makeUserState(state: GameRoomState) {
    const userGameRoomState: UserGameRoomState = {
      paddle1: state.paddle1,
      paddle2: state.paddle2,
      ballx: state.ball.x,
      bally: state.ball.y,
      score1: state.score1,
      score2: state.score2,
    };

    return userGameRoomState;
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

    player1.join(roomId);
    player2.join(roomId);
    player1.data = { ...player1.data, roomId: roomId };
    player2.data = { ...player2.data, roomId: roomId };

    console.log(
      `Create Game {roomId: ${roomId}, p1: ${player1.id}, p2: ${player2.id}}`,
    );

    await this.database.updateUserGameRoom(
      player1.data.uid,
      player2.data.uid,
      roomId,
    );
    this.dmGateway.updateUser(player1.data.uid);
    this.dmGateway.updateUser(player2.data.uid);
    const startState = this.makeStartState(roomInfo);
    player1.emit('game/start', startState);
    player2.emit('game/start', startState);

    this.broadcastStateInRoom = this.broadcastStateInRoom.bind(this);
    this.roomInfos[roomId] = roomInfo;
    const broadcast = setInterval(
      this.broadcastStateInRoom,
      25,
      this.roomInfos[roomId],
    );
    this.roomInfos[roomId].broadcast = broadcast;
  }

  private endGame(
    winner: Socket,
    loser: Socket,
    roomInfo: GameRoomInfo,
    userGameRoomState: UserGameRoomState,
  ) {
    const { roomId, player1, player2, crowd, broadcast } = roomInfo;

    this.database.updateUserExitGameRoom(player1.data.uid, player2.data.uid);
    player1.emit('game/end', userGameRoomState);
    player1.leave(roomId);
    player1.data.roomId = null;
    player2.emit('game/end', userGameRoomState);
    player2.leave(roomId);
    player2.data.roomId = null;
    for (const c of crowd) {
      c.emit('game/end', userGameRoomState);
      c.leave(roomId);
      c.data.roomId = null;
    }
    clearInterval(broadcast);
    this.roomInfos[roomId] = null;
    this.saveResult(winner, loser, roomInfo);
  }

  private saveResult(winner: Socket, loser: Socket, roomInfo: GameRoomInfo) {
    const { mode } = roomInfo;
    this.gameResult.saveResult({
      winnerUid: winner.data.uid,
      loserUid: loser.data.uid,
      isRank: mode == 0 ? true : false,
    });
  }

  broadcastStateInRoom(roomInfo: GameRoomInfo) {
    const { speed, player1, player2, crowd, state } = roomInfo;

    // move paddle
    state.paddle1 += state.keyState1 * 4 * 3 * speed;
    state.paddle2 += state.keyState2 * 4 * 3 * speed;

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
      state.ball = this.ballInit();
    } else if (state.ball.x <= -(GameInfo.width / 2 - GameInfo.ballr)) {
      state.score2 += 1;
      state.paddle1 = 0;
      state.paddle2 = 0;
      state.ball = this.ballInit();
    }

    const userGameRoomState: UserGameRoomState = this.makeUserState(state);

    if (state.score1 >= 3) {
      this.endGame(player1, player2, roomInfo, userGameRoomState);
    } else if (state.score2 >= 3) {
      this.endGame(player2, player1, roomInfo, userGameRoomState);
    }

    player1.emit('game/state', userGameRoomState);
    player2.emit('game/state', userGameRoomState);
    for (const c of crowd) {
      c.emit('game/state', userGameRoomState);
    }
  }

  updateKeyState(client: Socket, payload: Code, keyState: number) {
    const room = client.data.roomId;
    try {
      const { player1, player2, state } = this.roomInfos[room];
      if (player1 === client) {
        state.keyState1 += payload.code * keyState;
      } else if (player2 === client) {
        state.keyState2 += payload.code * keyState;
      }
    } catch (error) {}
  }

  specStart(client: Socket, roomId: string) {
    try {
      const idx = this.roomInfos[roomId].crowd.findIndex(
        (inqueue) => inqueue === client,
      );
      if (idx !== -1) {
        // 중복 요청
      } else {
        client.join(roomId);
        client.data = { ...client.data, roomId: roomId };
        client.emit('game/start', this.makeStartState(this.roomInfos[roomId]));
        this.roomInfos[roomId].crowd.push(client);
      }
    } catch (error) {
      client.emit('game/error');
    }
  }

  exitGame(client: Socket) {
    try {
      const room = client.data.roomId;
      const { player1, player2, crowd, state } = this.roomInfos[room];
      if (player1 === client) {
        this.endGame(
          player2,
          player1,
          this.roomInfos[room],
          this.makeUserState(state),
        );
      } else if (player2 === client) {
        this.endGame(
          player1,
          player2,
          this.roomInfos[room],
          this.makeUserState(state),
        );
      } else {
        const index = crowd.findIndex((crowd) => crowd === client);
        if (index !== -1) {
          crowd.splice(index, 1);
        }
      }
    } catch (error) {}
  }
}
