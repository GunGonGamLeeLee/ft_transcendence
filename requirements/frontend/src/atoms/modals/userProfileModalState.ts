import { atom } from 'recoil';
import { UserDataType } from '../userDataType';

// todo: chat user type extends user data type
export const userProfileModalState = atom<UserDataType | undefined>({
  key: 'userProfileModalState',
  default: undefined,
});
