import { atom } from 'recoil';

export const newRoomModalState = atom<boolean>({
  key: 'newRoomModalState',
  default: false,
});
