import { atom, useRecoilValue } from 'recoil';

interface State {
  token: string | null;
}

export const authState = atom<State>({
  key: 'auth',
  default: { token: null },
  effects: [
    ({ setSelf, onSet }) => {
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
    },
  ],
});

export const useIsLoggedIn = () => {
  const { token } = useRecoilValue(authState);

  return token !== null;
};
