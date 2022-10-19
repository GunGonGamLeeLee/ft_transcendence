import styles from './ChatInfo.module.css';
import { useRecoilValue } from 'recoil';
import { currRoomState, RoomModeType } from '../../../atoms/currRoomState';
import { currUserCountState } from '../../../atoms/currUserCount';

export function ChatInfo() {
  const currRoom = useRecoilValue(currRoomState);
  const currUserCount = useRecoilValue(currUserCountState);

  return (
    <div className={styles.chat_info}>
      {currRoom !== null ? (
        <>
          <div className={styles.chat_info__id}>
            {currRoom.roomId.replace('channel', '')}
          </div>
          <div className={`${styles.chat_info__mode}`}>
            <img
              src={
                currRoom.mode === RoomModeType.PRIVATE
                  ? '/private.png'
                  : currRoom.mode === RoomModeType.PROTECTED
                  ? '/lock.png'
                  : '/unlock.png'
              }
              className={styles.chat_info__icon}
            />
          </div>
          <div className={`${styles.chat_info__title}`}>{currRoom.title}</div>
          <div className={`${styles.chat_info__count}`}>{currUserCount}</div>
          <div className={`${styles.chat_info__owner}`}>
            {currRoom.ownerDisplayName}
          </div>
        </>
      ) : null}
    </div>
  );
}
