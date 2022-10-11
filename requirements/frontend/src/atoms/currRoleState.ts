import { atom } from 'recoil';

type roleType = 'owner' | 'admin' | 'user'; // todo

export const currRoleState = atom<roleType | null>({
  key: 'currRole',
  default: null,
});
