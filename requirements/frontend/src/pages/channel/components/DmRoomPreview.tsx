import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { currDmRoomState, DmRoomType } from '../../../atoms/currDmRoomState';
import styles from './RoomPreview.module.css';

export function DmRoomPreview({ room }: { room: DmRoomType }) {
  const setCurrDmRoom = useSetRecoilState(currDmRoomState);
  const navigator = useNavigate();

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    setCurrDmRoom(room);

    navigator('/channel/dm');
  };

  return (
    <li className={styles.li__li} onClick={onClick}>
      <div className={styles.li__id}>{room.roomId.replace('channel', '')}</div>
      <div className={`${styles.li__dm}`}>{room.userDisplayName}</div>
    </li>
  );
}
