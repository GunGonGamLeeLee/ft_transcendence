import { atom } from 'recoil';

export interface RoomType {
  roomId: number;
  title: string;
  owner: string;
  userCount: number;
  lock: boolean;
}

export const currRoomState = atom<RoomType | null>({
  key: 'currRoom',
  default: null,
});
