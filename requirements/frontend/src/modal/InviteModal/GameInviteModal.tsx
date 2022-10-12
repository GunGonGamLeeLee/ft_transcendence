import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { gameInviteModalState } from '../../atoms/modals/gameInviteModalState';
import { RedCross } from '../buttons/RedCross';
import modalstyles from '../Modal.module.css';
import styles from './InviteModal.module.css';

export function GameInviteModal() {
  const gameInviteModal = useRecoilValue(gameInviteModalState);

  return (
    <>
      {gameInviteModal === undefined ? null : (
        <GameInvite id={gameInviteModal} />
      )}
    </>
  );
}

function GameInvite({ id }: { id: number }) {
  const setgameInviteModal = useSetRecoilState(gameInviteModalState);

  const onClick = () => {
    setgameInviteModal(undefined);
  };

  return (
    <div className={modalstyles.modal}>
      <div className={modalstyles.modal__blank} onClick={onClick}></div>
      <div className={styles.invite}>
        <div className={styles.invite__header}>
          <span className={styles.invite__headertitle}>게임 초대</span>
          <RedCross onClick={onClick} />
        </div>
        <div className={styles.invite__main}>{id}번 방에서 초대 옴</div>
        <div className={styles.invite__footer}>
          <InviteButton text='거절' />
          <InviteButton text='수락' />
        </div>
      </div>
    </div>
  );
}

function InviteButton({ text }: { text: string }) {
  return <button className={styles.invite__button}>{text}</button>;
}
