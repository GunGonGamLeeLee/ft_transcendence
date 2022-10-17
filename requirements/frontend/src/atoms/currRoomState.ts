import { atom } from 'recoil';
import { ChatUserType } from './chatUserType';

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

export const currRoomState = atom<RoomType | null>({
  key: 'currRoom',
  default: null,
});

export const currUserListState = atom<ChatUserType[]>({
  key: 'currUserList',
  default: [],
});

export const currMuteListState = atom<number[]>({
  key: 'currMuteList',
  default: [],
});

export const currBanListState = atom<number[]>({
  key: 'currBanList',
  default: [],
});
