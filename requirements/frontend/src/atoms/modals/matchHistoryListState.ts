import { atom, selector } from 'recoil';
import { authState } from '../authState';

interface MatchHistoryUserType {
  uid: number;
  displayName: string;
  imgUri: string;
}

export interface MatchHistoryType {
  index: number;
  isRank: boolean;
  winner: MatchHistoryUserType;
  loser: MatchHistoryUserType;
}

export const matchHistoryListState = atom<MatchHistoryType[]>({
  key: 'matchHistoryList',
  default: [],
});

export const requestMatchHistory = async (token: string, uid: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_EP}/users/match?uid=${uid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data: MatchHistoryType[] = await response.json();
  return data;
};
