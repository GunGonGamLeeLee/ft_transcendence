import { useRecoilValue } from 'recoil';
import { currDmRoomState } from '../../../atoms/currDmRoomState';
import styles from './ChatInfo.module.css';

export function DmChatInfo() {
  const currDmRoom = useRecoilValue(currDmRoomState);
  if (currDmRoom === null) throw new Error();

  return (
    <div className={styles.chat_info}>
      <>
        <div className={styles.chat_info__id}>{currDmRoom.roomId}</div>
        <div className={`${styles.chat_info__mode}`}>
          <img src={'/private.png'} className={styles.chat_info__icon} />
        </div>
        {/* <div className={`${styles.chat_info__title}`}>{currDmRoom.title}</div> */}
        {/* <div className={`${styles.chat_info__count}`}>{currUserCount}</div> */}
        <div className={`${styles.chat_info__owner}`}>
          {currDmRoom.userDisplayName}
        </div>
      </>
    </div>
  );
}
