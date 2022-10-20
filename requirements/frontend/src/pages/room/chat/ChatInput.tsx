import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currRoomState } from '../../../atoms/currRoomState';
import { isScrollRefreshState } from '../../../atoms/isScrollRefresh';
import { userProfileState } from '../../../atoms/userProfileState';
import { socket } from '../../../components/Socket/SocketChecker';
import { getChId } from '../../../utils/getChId';
import styles from './ChatInput.module.css';

export function ChatInput() {
  const { uid } = useRecoilValue(userProfileState);
  const setIsRefresh = useSetRecoilState(isScrollRefreshState);
  const currRoom = useRecoilValue(currRoomState);
  if (currRoom === null) throw new Error();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form === null) return;

    const formData = new FormData(form);

    const msg = formData.get('msg');
    if (typeof msg !== 'string') return;

    socket.emit('chat/msg', {
      chid: getChId(currRoom.roomId),
      msg,
      myUid: uid,
    });

    setIsRefresh(true);

    form.reset();
  };

  return (
    <div className={styles.chat__div}>
      <form className={styles.chat__form} onSubmit={onSubmit}>
        <input
          autoComplete='off'
          type='text'
          name='msg'
          className={styles.chat__input}
          autoFocus={true}
        />
        <button type='submit' className={styles.chat__submit}>
          SEND
        </button>
      </form>
    </div>
  );
}
