import { atom } from 'recoil';

export interface DmLogType {
  targetUid: number;
  msg: string;
}

export const DmLogState = atom<DmLogType[]>({
  key: 'dmLog',
  default: [],
});
