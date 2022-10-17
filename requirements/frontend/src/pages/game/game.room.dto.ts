import { Socket } from 'socket.io-client';

export interface CanvasState {
  status: number;
  gameRoomState: GameRoomState | undefined;
}

export interface SmallProfileType {
  displayName: string;
  imgUri: string;
  rating: number;
}

export interface ProfileStateType {
  profile1: SmallProfileType;
  profile2: SmallProfileType;
}

export interface GameRoomState {
  profile1?: SmallProfileType;
  profile2?: SmallProfileType;
  paddle1: number; // 유저 paddle 위치
  paddle2: number;
  ballx: number;
  bally: number;
  score1: number;
  score2: number;
}
