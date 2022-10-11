import { atom } from 'recoil';

export const chatInviteModalState = atom<number | undefined>({
  key: 'chatInviteModalState',
  default: undefined,
});
