import Cookies from 'js-cookie';
import { atom, AtomEffect } from 'recoil';

interface AuthStateType {
  token: string | null;
}

const localStorageEffect: AtomEffect<AuthStateType> = ({ setSelf, onSet }) => {
  const savedState = localStorage.getItem('auth');
  if (savedState !== null) {
    setSelf(JSON.parse(savedState));
  }

  onSet((newValue, _, isReset) => {
    if (isReset || newValue.token === null) {
      localStorage.removeItem('auth');
      Cookies.remove('token');
    } else {
      localStorage.setItem('auth', JSON.stringify(newValue));
    }
  });
};

export const authState = atom<AuthStateType>({
  key: 'auth',
  default: { token: null },
  effects: [localStorageEffect],
});
