import { atom, selector } from 'recoil';
import { authState } from './authState';
import { UserDataType } from './userDataType';

export type UserDataMap = Map<number, UserDataType>;

interface pendingFriendType {
  data: UserDataType;
  isAdd: boolean;
}

export const pendingFriendState = atom<pendingFriendType[]>({
  key: 'pendingFriend',
  default: [],
});

export const friendListState = atom<UserDataMap>({
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

const requestFriendList = async (token: string): Promise<UserDataMap> => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_EP}/users/friend`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error();

  const data: UserDataType[] = await response.json();

  const ret: UserDataMap = new Map<number, UserDataType>();

  for (let value of data) {
    ret.set(value.uid, value);
  }

  return ret;
};
