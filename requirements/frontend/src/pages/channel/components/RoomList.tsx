import { RoomType } from '../../../atoms/currRoomState';
import { RoomPreview } from './RoomPreview';
import styles from './RoomList.module.css';

export function RoomList({
  roomList,
  isActive,
}: {
  roomList: RoomType[];
  isActive: boolean;
}) {
  return (
    <div className={`${isActive ? '' : styles.channel__inactive}`}>
      <div className={styles.room_index}>
        <div className={styles.room_index__id}>ID</div>
        <div className={`${styles.room_index__title}`}>TITLE</div>
        <div className={`${styles.room_index__owner}`}>OWNER</div>
        <div className={`${styles.room_index__count}`}>COUNT</div>
        <div className={`${styles.room_index__mode}`}>MODE</div>
      </div>
      <ol className={`${styles.channel__list} `}>
        {roomList.map((room, index) => {
          return <RoomPreview room={room} key={index} />;
        })}
      </ol>
    </div>
  );
}
