import styles from './ChatInfo.module.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currRoomState } from '../../../atoms/currRoomState';

export function ChatInfo() {
  const currRoom = useRecoilValue(currRoomState);
  return (
    <div className={styles.chat_info}>
      {currRoom !== null ? (
        <>
          <div className={styles.chat_info__id}>{currRoom.roomId}</div>
          <div className={`${styles.chat_info__mode}`}>
            <img
              src={
                currRoom.private
                  ? '/private.png'
                  : currRoom.lock
                  ? '/lock.png'
                  : '/unlock.png'
              }
              className={styles.chat_info__icon}
            />
          </div>
          <div className={`${styles.chat_info__title}`}>{currRoom.title}</div>
          <div className={`${styles.chat_info__count}`}>
            {currRoom.userCount}
          </div>
          <div className={`${styles.chat_info__owner}`}>
            {currRoom.ownerName}
          </div>
        </>
      ) : null}
    </div>
  );
}
