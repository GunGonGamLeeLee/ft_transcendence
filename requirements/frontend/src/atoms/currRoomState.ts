import { atom } from 'recoil';

export interface RoomType {
  roomId: number;
  title: string;
  ownerId: number;
  ownerName: string;
  userCount: number;
  lock: boolean;
  private: boolean;
}

export const currRoomState = atom<RoomType | null>({
  key: 'currRoom',
  default: null,
});
