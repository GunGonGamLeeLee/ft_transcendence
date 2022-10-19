import { atom, selector } from 'recoil';
import { authState } from './authState';
import { Status, UserDataType } from './userDataType';

export const rankListState = atom<UserDataType[]>({
  key: 'rankList',
  default: selector({
    key: 'rankList/default',
    get: ({ get }) => {
      const { token } = get(authState);
      if (token === null) throw new Error();

      return requestRankList(token);
    },
  }),
});

const requestRankList = async (token: string): Promise<UserDataType[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_EP}/users/rank`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error();

  const data = await response.json();
  for (const user of data) {
    user.status = Status.RANK;
  }
  return data;
};
