import { atom } from 'recoil';

export type filterType = 'all' | 'joined' | 'dm';

export const filterState = atom<filterType>({
  key: 'filter',
  default: 'all',
});
