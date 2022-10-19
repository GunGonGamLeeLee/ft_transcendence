import { atom } from 'recoil';

export interface DmLogType {
  toUid: number;
  msg: string;
}

export const DmLogState = atom<DmLogType[]>({
  key: 'dmLog',
  default: [],
});
