import { atom, selector } from 'recoil';
import { authState } from './authState';
import { UserDataType } from './userDataType';

export const blockedListState = atom<UserDataType[]>({
  key: 'blockList',
  default: selector({
    key: 'blockList/default',
    get: ({ get }) => {
      const { token } = get(authState);
      if (token === null) throw new Error();

      return requestBlockList(token);
    },
  }),
});

const requestBlockList = async (token: string): Promise<UserDataType[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_EP}/users/blocklist`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error();

  const data = await response.json();
  return data;
};
