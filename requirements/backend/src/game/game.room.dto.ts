import { Socket } from 'socket.io';

export interface InviteRoomType {
  player1: Socket;
  uid1: number;
  uid2: number;
  speed: number;
}

export interface gameType {
  uid1: number;
  uid2: number;
  speed: number;
}

export interface Code {
  code: number;
}

export interface Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export interface GameRoomState {
  keyState1: number; // 유저 키 상태
  keyState2: number; // 유저 키 상태
  paddle1: number; // 유저 paddle 위치
  paddle2: number;
  ball: Ball;
  score1: number;
  score2: number;
}

export interface StartGameRoomState {
  profile1: SmallProfileType;
  profile2: SmallProfileType;
  paddle1: number; // 유저 paddle 위치
  paddle2: number;
  ballx: number;
  bally: number;
  score1: number;
  score2: number;
}

export interface UserGameRoomState {
  paddle1: number; // 유저 paddle 위치
  paddle2: number;
  ballx: number;
  bally: number;
  score1: number;
  score2: number;
}

export interface SmallProfileType {
  displayName: string;
  imgUri: string;
  rating: number;
}

export interface GameRoomInfo {
  roomId: string;
  mode: number;
  speed: number;
  player1: Socket;
  player2: Socket;
  profile1: SmallProfileType;
  profile2: SmallProfileType;
  crowd: Socket[];
  state: GameRoomState;
  broadcast: NodeJS.Timeout;
}
