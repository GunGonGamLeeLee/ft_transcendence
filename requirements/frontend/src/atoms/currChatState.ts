import { atom } from 'recoil';
import { ChatUserType } from './chatUserType';

export interface ChatLogType {
  index: number;
  uid: number;
  user: ChatUserType | undefined;
  msg: string;
}

export const currChatState = atom<ChatLogType[]>({
  key: 'currChat',
  default: [],
});
