import { useNavigate } from 'react-router-dom';
import { RoomType } from '../ChannelLobby';
import styles from './RoomPreview.module.css';

export function RoomPreview({ room }: { room: RoomType }) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(room.roomId.toString());
  };

  return (
    <li className={styles.li__li} onClick={onClick}>
      <div className={styles.li__id}>{room.roomId}</div>
      <div className={`${styles.li__title}`}>{room.title}</div>
      <div className={`${styles.li__owner}`}>{room.owner}</div>
      <div className={`${styles.li__count}`}>{room.userCount}명</div>
      <div className={`${styles.li__count}`}>
        {room.lock ? 'lock' : 'unlock'}
      </div>
    </li>
  );
}
