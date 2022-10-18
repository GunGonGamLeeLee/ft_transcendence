import React from 'react';
import { useRecoilValue } from 'recoil';
import { currDmRoomState } from '../../../atoms/currDmRoomState';
import { socket } from '../../../components/Socket/SocketChecker';
import styles from './ChatInput.module.css';

export function DmChatInput() {
  const currDmRoom = useRecoilValue(currDmRoomState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form === null) return;

    const formData = new FormData(form);

    const msg = formData.get('msg');
    if (typeof msg !== 'string') return;

    socket.emit('dm/msg', {
      targetUid: currDmRoom?.userId,
      msg,
    });

    form.reset();
  };

  return currDmRoom === null ? null : (
    <div className={styles.chat__div}>
      <form className={styles.chat__form} onSubmit={onSubmit}>
        <input
          autoComplete='off'
          type='text'
          name='msg'
          className={styles.chat__input}
          onBlur={({ target }) => target.focus()}
        />
        <button type='submit' className={styles.chat__submit}>
          SEND
        </button>
      </form>
    </div>
  );
}
