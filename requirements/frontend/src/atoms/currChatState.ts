import { atom } from 'recoil';

export interface ChatLogType {
  uid: number;
  displayName: string;
  imgUri: string;
  msg: string;
}

export interface ChatType {
  me: ChatLogType[];
  other: ChatLogType[];
}

export const currChatState = atom<ChatType>({
  key: 'currChat',
  default: { me: [], other: [] },
});
