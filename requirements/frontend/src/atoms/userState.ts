import { atom } from 'recoil';

export const userDisplayNameState = atom<string | undefined>({
  key: 'userDisplayNameState',
  default: undefined,
});

export const userProfileImgState = atom<string | undefined>({
  key: 'userProfileImgState',
  default: undefined,
});
