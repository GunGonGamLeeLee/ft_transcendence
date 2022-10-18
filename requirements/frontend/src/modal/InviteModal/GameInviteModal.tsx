import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { gameState } from '../../atoms/gameState';
import { gameInviteModalState } from '../../atoms/modals/gameInviteModalState';
import { RedCross } from '../buttons/RedCross';
import modalstyles from '../Modal.module.css';
import styles from './InviteModal.module.css';

export function GameInviteModal() {
  const gameInviteModal = useRecoilValue(gameInviteModalState);

  return (
    <>
      {gameInviteModal === undefined ? null : (
        <GameInvite uid={gameInviteModal} />
      )}
    </>
  );
}

function GameInvite({ uid }: { uid: number }) {
  const [game, SetGame] = useRecoilState(gameState);
  const navigator = useNavigate();
  const setgameInviteModal = useSetRecoilState(gameInviteModalState);

  const onClick = () => {
    setgameInviteModal(undefined);
  };

  const onAccept = () => {
    SetGame({ mode: 2, Id: uid, speed: 1 });
    setgameInviteModal(undefined);
    navigator('/game');
  };

  return (
    <div className={modalstyles.modal}>
      <div className={modalstyles.modal__blank} onClick={onClick}></div>
      <div className={styles.invite}>
        <div className={styles.invite__header}>
          <span className={styles.invite__headertitle}>게임 초대</span>
          <RedCross onClick={onClick} />
        </div>
        <div className={styles.invite__main}>{uid}에게서 초대 옴</div>
        <div className={styles.invite__footer}>
          <button className={styles.invite__button} onClick={onAccept}>
            OK
          </button>
          <button className={styles.invite__button} onClick={onAccept}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
}
