import { DmRoomType } from '../../../atoms/currRoomState';
import { DmRoomPreview } from './DmRoomPreview';
import styles from './RoomList.module.css';

export function DmList({
  dmRoomList,
  isActive,
}: {
  dmRoomList: DmRoomType[];
  isActive: boolean;
}) {
  return (
    <div className={`${isActive ? '' : styles.channel__inactive}`}>
      <div className={styles.room_index}>
        <div className={styles.room_index__id}>ID</div>
        <div className={`${styles.dm_index__owner}`}>USER</div>
      </div>
      <ol className={`${styles.channel__list} `}>
        {dmRoomList.map((room, index) => {
          return <DmRoomPreview room={room} key={index} />;
        })}
      </ol>
    </div>
  );
}
