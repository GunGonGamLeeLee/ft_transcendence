import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { currRoomState } from '../../../atoms/currRoomState';
import { RoomType } from '../../../atoms/currRoomState';
import styles from './RoomPreview.module.css';

export function RoomPreview({ room }: { room: RoomType }) {
  const setCurrRoom = useSetRecoilState(currRoomState);
  const navigator = useNavigate();

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    setCurrRoom(room);

    if (room.lock) {
      navigator('/channel/roomChecker');
      return;
    }

    navigator('/channel/room');
  };

  return (
    <li className={styles.li__li} onClick={onClick}>
      <div className={styles.li__id}>{room.roomId}</div>
      <div className={`${styles.li__title}`}>{room.title}</div>
      <div className={`${styles.li__owner}`}>{room.ownerName}</div>
      <div className={`${styles.li__count}`}>{room.userCount}명</div>
      <div className={`${styles.li__count}`}>
        {room.lock ? 'lock' : 'unlock'}
      </div>
    </li>
  );
}
