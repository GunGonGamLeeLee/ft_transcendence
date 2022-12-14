import { atom } from 'recoil';
import { RoomType } from './currRoomState';
import { DmRoomType } from './currDmRoomState';

export const allRoomListState = atom<RoomType[]>({
  key: 'allRoomList',
  default: [],
});

export const joinedRoomListState = atom<RoomType[]>({
  key: 'joinedRoomList',
  default: [],
});

export const dmRoomListState = atom<DmRoomType[]>({
  key: 'dmRoomList',
  default: [],
});
