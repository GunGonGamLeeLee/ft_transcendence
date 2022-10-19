import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currDmRoomState } from '../../../atoms/currDmRoomState';
import styles from './ChatInfo.module.css';

export function DmChatInfo() {
  const currDmRoom = useRecoilValue(currDmRoomState);
  const navigator = useNavigate();

  React.useEffect(() => {
    if (currDmRoom === null) navigator('/channel');
  }, [currDmRoom]);

  return (
    <div className={styles.chat_info}>
      <>
        <div className={styles.chat_info__id}>
          {currDmRoom?.roomId.replace('channel', '')}
        </div>
        <div className={`${styles.chat_info__mode}`}>
          <img src={'/private.png'} className={styles.chat_info__icon} />
        </div>
        <div className={`${styles.chat_info__owner}`}>
          {currDmRoom?.userDisplayName}
        </div>
      </>
    </div>
  );
}
