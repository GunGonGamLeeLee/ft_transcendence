import { atom, selector } from 'recoil';
import { GameType } from './gameType';

export const gameState = atom<GameType | null>({
  key: 'gameState',
  default: null,
});
