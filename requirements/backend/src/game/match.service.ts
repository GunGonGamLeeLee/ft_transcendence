import { Injectable } from '@nestjs/common';
import { GameRoomService } from './game.service';
import { Socket } from 'socket.io';
import { gameType, InviteRoomType } from './game.dto';

@Injectable()
export class MatchMakingService {
  private waitingQueue: Socket[] = [];
  private inviteQueue: InviteRoomType[] = [];

  constructor(private gameRoomService: GameRoomService) {
    setInterval(this.matchMaking.bind(this), 1000);
  }

  matchMaking() {
    // match 성사
    const length = this.waitingQueue.length;
    for (let i = 1; i < length; i += 2) {
      const player1 = this.waitingQueue[0];
      const player2 = this.waitingQueue[1];
      this.gameRoomService.createRoom(player1, player2, 0, 1);
      this.waitingQueue.splice(0, 2);
    }

    // match 실패
    // -> 아무것도 안함..?
  }

  matchRegister(client: Socket) {
    if (this.waitingQueue.find((queue) => queue === client) === undefined) {
      this.waitingQueue.push(client);
      console.log('match-register ' + client.id);
    }
  }

  matchUnregister(client: Socket) {
    const idx = this.waitingQueue.findIndex((inqueue) => inqueue === client);
    if (idx !== -1) {
      this.waitingQueue.splice(idx, 1);
    }
    const idx2 = this.inviteQueue.findIndex(
      (inqueue) => inqueue.player1 === client,
    );
    if (idx2 !== -1) {
      this.inviteQueue.splice(idx2, 1);
    }
  }

  inviteUser(client: Socket, payload: { uid: number; speed: number }) {
    this.inviteQueue.push({
      player1: client,
      uid1: client.data.uid,
      uid2: payload.uid,
      speed: payload.speed,
    });
  }

  invitedUser(client: Socket, payload: { uid: number }) {
    const idx = this.inviteQueue.findIndex(
      (inqueue) =>
        inqueue.uid1 === payload.uid && inqueue.uid2 === client.data.uid,
    );

    if (idx !== -1) {
      this.gameRoomService.createRoom(
        this.inviteQueue[idx].player1,
        client,
        1,
        this.inviteQueue[idx].speed,
      );
      this.inviteQueue.splice(idx, 1);
    } else {
      // throw error!!
    }
  }
}
