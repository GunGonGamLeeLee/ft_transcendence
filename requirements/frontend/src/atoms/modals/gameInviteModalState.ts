import { atom } from 'recoil';

interface InviteType {
  uid: number;
  displayName: string;
}

export const gameInviteModalState = atom<InviteType | undefined>({
  key: 'gameInviteModalState',
  default: undefined,
});
