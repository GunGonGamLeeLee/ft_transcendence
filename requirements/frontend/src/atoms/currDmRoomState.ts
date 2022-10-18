import { atom } from 'recoil';
import { RoomModeType } from './currRoomState';

export interface DmRoomType {
  roomId: string;
  userId: number;
  userDisplayName: string;
  imgUri: string;
  mode: RoomModeType.DM;
}

export const currDmRoomState = atom<DmRoomType | null>({
  key: 'currDmRoom',
  default: null,
});
