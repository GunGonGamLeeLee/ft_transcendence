import { atom } from 'recoil';

export interface ChatLogType {
  index: number;
  uid: number;
  msg: string;
}

export const currChatState = atom<ChatLogType[]>({
  key: 'currChat',
  default: [],
});
