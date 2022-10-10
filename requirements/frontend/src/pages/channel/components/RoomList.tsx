import { RoomType } from '../../../atoms/currRoomState';
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
      {roomList.map((room, index) => {
        return <RoomPreview room={room} key={index} />;
      })}
    </ol>
  );
}
