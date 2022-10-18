import { atom } from 'recoil';

export const currUserCountState = atom<number>({
  key: 'currUserCount',
  default: 1,
});
