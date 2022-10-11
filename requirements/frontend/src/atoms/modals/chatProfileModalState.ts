import { atom } from 'recoil';
import { ChatUserType } from '../chatUserType';

// todo: chat user type extends user data type
export const chatProfileModalState = atom<ChatUserType | undefined>({
  key: 'chatProfileModalState',
  default: undefined,
});
