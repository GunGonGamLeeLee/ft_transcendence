import React, * as Reaact from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../../atoms/authState';
import { blockedListState } from '../../../atoms/blockedListState';
import { gameState } from '../../../atoms/gameState';
import { chatProfileModalState } from '../../../atoms/modals/chatProfileModalState';
import { userProfileModalState } from '../../../atoms/modals/userProfileModalState';
import styles from './Buttons.module.css';

export function InviteGame({ uid }: { uid: number }) {
  const [game, SetGame] = useRecoilState(gameState);
  const navigator = useNavigate();

  const onClick = () => {
    SetGame({ mode: 1, Id: uid, speed: 1 });
    navigator('/game');
  };

  return (
    <button className={styles.buttons} onClick={onClick}>
      GAME
    </button>
  );
}
