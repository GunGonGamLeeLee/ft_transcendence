import { atom } from 'recoil';

export const setRoomModalState = atom<boolean>({
  key: 'setRoomModalState',
  default: false,
});
