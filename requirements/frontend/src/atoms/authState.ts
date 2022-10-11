import { atom, AtomEffect } from 'recoil';

interface State {
  token: string | null;
}

const localStorageEffect: AtomEffect<State> = ({ setSelf, onSet }) => {
  const savedState = localStorage.getItem('auth');
  if (savedState !== null) {
    setSelf(JSON.parse(savedState));
  }

  onSet((newValue, _, isReset) => {
    if (isReset || newValue.token === null) {
      localStorage.removeItem('auth');
    } else {
      localStorage.setItem('auth', JSON.stringify(newValue));
    }
  });
};

export const authState = atom<State>({
  key: 'auth',
  default: { token: null },
  effects: [localStorageEffect],
});
