import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { chatInviteModalState } from '../../atoms/modals/chatInviteModalState';
import { RedCross } from '../buttons/RedCross';
import modalstyles from '../Modal.module.css';
import styles from './InviteModal.module.css';

export function ChatInviteModal() {
  const chatInviteModal = useRecoilValue(chatInviteModalState);

  return (
    <>
      {chatInviteModal === undefined ? null : (
        <ChatInvite id={chatInviteModal} />
      )}
    </>
  );
}

function ChatInvite({ id }: { id: number }) {
  const setChatInviteModal = useSetRecoilState(chatInviteModalState);

  const onClick = () => {
    setChatInviteModal(undefined);
  };

  return (
    <div className={modalstyles.modal}>
      <div className={modalstyles.modal__blank} onClick={onClick}></div>
      <div className={styles.invite}>
        <div className={styles.invite__header}>
          <span className={styles.invite__headertitle}>채팅 초대</span>
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
