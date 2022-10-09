import { RoomType } from '../ChannelLobby';
import { RoomPreview } from './RoomPreview';
import styles from '../ChannelLobby.module.css';

export function RoomList({
  roomList,
  isActive,
}: {
  roomList: RoomType[];
  isActive: boolean;
}) {
  return (
    <ol
      className={`${styles.channel__list} ${
        isActive ? '' : styles.channel__inactive
      }`}
    >
      {roomList.map((room) => {
        return <RoomPreview room={room} key={room.roomId} />;
      })}
    </ol>
  );
}
