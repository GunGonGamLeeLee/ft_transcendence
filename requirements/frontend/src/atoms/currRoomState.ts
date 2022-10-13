import { atom } from 'recoil';

export const enum RoomModeType {
  PUBLIC,
  PROTECTED,
  PRIVATE,
  DM,
}

export interface RoomType {
  roomId: string;
  title: string;
  ownerId: number;
  ownerDisplayName: string;
  userCount: number;
  mode: RoomModeType;
}

export interface DmRoomType {
  roomId: string;
  userId: number;
  userDisplayName: string;
}

export const currRoomState = atom<RoomType | DmRoomType | null>({
  key: 'currRoom',
  default: null,
});
