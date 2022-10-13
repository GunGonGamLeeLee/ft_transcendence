import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { currRoomState, DmRoomType } from '../../../atoms/currRoomState';
import styles from './RoomPreview.module.css';

export function DmRoomPreview({ room }: { room: DmRoomType }) {
  const setCurrRoom = useSetRecoilState(currRoomState);
  const navigator = useNavigate();

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    setCurrRoom(room);

    navigator('/channel/room');
  };

  return (
    <li className={styles.li__li} onClick={onClick}>
      <div className={styles.li__id}>{room.roomId}</div>
      <div className={`${styles.li__dm}`}>{room.userDisplayName}</div>
    </li>
  );
}
