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

      return useRequestFriendList(token);
    },
  }),
});

const useRequestFriendList = async (token: string): Promise<UserDataType[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_EP}/users/friend`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data;
};
