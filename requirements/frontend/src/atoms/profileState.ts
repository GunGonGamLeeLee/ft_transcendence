import { atom } from 'recoil';

interface State {
  id: string;
  displayName: string;
  imgUri: string;
}

export const profileState = atom<State | null>({
  key: 'profile',
  default: null,
});
