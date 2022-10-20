import { atom } from 'recoil';

export const isScrollRefreshState = atom<boolean>({
  key: 'isScrollRefresh',
  default: true,
});
