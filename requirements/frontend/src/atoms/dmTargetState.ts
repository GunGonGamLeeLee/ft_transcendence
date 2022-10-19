import { atom } from 'recoil';
import { UserDataType } from './userDataType';

export const dmTargetState = atom<UserDataType | null>({
  key: 'dmTarget',
  default: null,
});
