import { atom } from 'recoil';

export const userProfileModalState = atom<number | undefined>({
  key: 'userProfileModalState',
  default: undefined,
});
