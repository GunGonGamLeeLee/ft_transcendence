import { atom } from 'recoil';
import { RoomType } from './currRoomState';

export const allRoomListState = atom<RoomType[]>({
  key: 'allRoomList',
  default: [],
});

export const joinedRoomListState = atom<RoomType[]>({
  key: 'joinedRoomList',
  default: [],
});

export const dmRoomListState = atom<RoomType[]>({
  key: 'dmRoomList',
  default: [],
});
