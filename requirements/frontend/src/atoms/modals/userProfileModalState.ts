import { atom } from 'recoil';
import { UserDataType } from '../userDataType';

export const userProfileModalState = atom<UserDataType | undefined>({
  key: 'userProfileModalState',
  default: undefined,
});
