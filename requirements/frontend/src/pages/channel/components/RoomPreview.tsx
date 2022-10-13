import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { currRoomState, RoomModeType } from '../../../atoms/currRoomState';
import { RoomType } from '../../../atoms/currRoomState';
import styles from './RoomPreview.module.css';

export function RoomPreview({ room }: { room: RoomType }) {
  const setCurrRoom = useSetRecoilState(currRoomState);
  const navigator = useNavigate();

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    setCurrRoom(room);

    if (room.mode === RoomModeType.PROTECTED) {
      navigator('/channel/roomChecker');
      return;
    }

    navigator('/channel/room');
  };

  return (
    <li className={styles.li__li} onClick={onClick}>
      <div className={styles.li__id}>{room.roomId}</div>
      <div className={`${styles.li__mode}`}>
        <img
          src={
            room.mode === RoomModeType.PRIVATE
              ? '/private.png'
              : room.mode === RoomModeType.PROTECTED
              ? '/lock.png'
              : '/unlock.png'
          }
          className={styles.li__icon}
        />
      </div>
      <div className={`${styles.li__title}`}>{room.title}</div>
      <div className={`${styles.li__count}`}>{room.userCount}</div>
      <div className={`${styles.li__owner}`}>{room.ownerDisplayName}</div>
    </li>
  );
}
