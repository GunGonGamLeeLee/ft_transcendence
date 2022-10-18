import { useRecoilValue } from 'recoil';
import { blockedListState } from '../../../atoms/blockedListState';
import { DmRoomType } from '../../../atoms/currDmRoomState';
import { DmRoomPreview } from './DmRoomPreview';
import styles from './RoomList.module.css';

export function DmList({
  dmRoomList,
  isActive,
}: {
  dmRoomList: DmRoomType[];
  isActive: boolean;
}) {
  const blockList = useRecoilValue(blockedListState);

  const filterBlocked = (room: DmRoomType) => {
    return (
      blockList.find((blocked) => blocked.uid === room.userId) === undefined
    );
  };

  return (
    <div className={`${isActive ? '' : styles.channel__inactive}`}>
      <div className={styles.room_index}>
        <div className={styles.room_index__id}>ID</div>
        <div className={`${styles.dm_index__owner}`}>USER</div>
      </div>
      <ol className={`${styles.channel__list} `}>
        {dmRoomList
          .filter((room) => filterBlocked(room))
          .map((room, index) => {
            return <DmRoomPreview room={room} key={index} />;
          })}
      </ol>
    </div>
  );
}
