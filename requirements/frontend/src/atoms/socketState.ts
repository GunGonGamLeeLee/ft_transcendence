import { atom } from 'recoil';

export const socketState = atom<boolean>({
  key: 'socket',
  default: false,
});
