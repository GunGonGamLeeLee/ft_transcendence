import { atom } from 'recoil';

export const gameInviteModalState = atom<number | undefined>({
  key: 'gameInviteModalState',
  default: undefined,
});
