import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { gameState } from '../../atoms/gameState';
import { gameInviteModalState } from '../../atoms/modals/gameInviteModalState';
import { RedCross } from '../buttons/RedCross';
import modalstyles from '../Modal.module.css';
import styles from './InviteModal.module.css';

interface InviteType {
  uid: number;
  displayName: string;
}

export function GameInviteModal() {
  const gameInviteModal = useRecoilValue(gameInviteModalState);

  return (
    <>
      {gameInviteModal === undefined ? null : (
        <GameInvite userInfo={gameInviteModal} />
      )}
    </>
  );
}

function GameInvite({ userInfo }: { userInfo: InviteType }) {
  const [game, SetGame] = useRecoilState(gameState);
  const navigator = useNavigate();
  const setgameInviteModal = useSetRecoilState(gameInviteModalState);

  const onClick = () => {
    setgameInviteModal(undefined);
  };

  const onAccept = () => {
    SetGame({ mode: 2, Id: userInfo.uid, speed: 1 });
    setgameInviteModal(undefined);
    navigator('/game');
  };

  return (
    <div className={modalstyles.modal}>
      <div className={modalstyles.modal__blank} onClick={onClick}></div>
      <div className={styles.invite}>
        <div className={styles.invite__header}>
          <span className={styles.invite__headertitle}>GAME INVITE</span>
          <RedCross onClick={onClick} />
        </div>
        <div className={styles.invite__main}>
          {userInfo.displayName} INVITED YOU.
        </div>
        <div className={styles.invite__footer}>
          <button className={styles.invite__button} onClick={onAccept}>
            OK
          </button>
          <button className={styles.invite__button} onClick={onClick}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
}
