import { atom, selector } from 'recoil';
import { authState } from './authState';
import { UserDataType } from './userDataType';

export const friendListState = atom<UserDataType[]>({
  key: 'friendList',
  default: selector({
    key: 'friendList/default',
    get: ({ get }) => {
      const { token } = get(authState);
      if (token === null) throw new Error();

      return requestFriendList(token);
    },
  }),
});

const requestFriendList = async (token: string): Promise<UserDataType[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_EP}/users/friend`,
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
