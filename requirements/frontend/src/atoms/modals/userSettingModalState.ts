import { atom } from 'recoil';

export const userSettingModalState = atom<boolean>({
  key: 'userSettingModalState',
  default: false,
});
