import { atom } from 'recoil';

export const refreshChannelListState = atom<boolean>({
  key: 'refreshChannelList',
  default: true,
});
