import styles from './ChannelLists.module.css';
import ChannelLi from './components/ChannelLi';

interface ChannelInterface {
  roomId: number;
  title: string;
  owner: string;
  userCount: number;
  lock: boolean;
}

export default function ChannelList({
  filter,
  option,
  channelList,
}: {
  filter: number;
  option: number;
  channelList: Array<ChannelInterface> | undefined;
}) {
  return (
    <ol
      className={`${styles.channel__list} ${
        filter == option ? '' : styles.channel__inactive
      }`}
    >
      {channelList === undefined ? (
        <div>loading</div>
      ) : (
        channelList.map((channel, index) => (
          // <ChannelLi channel={channel} key={channel.roomId} /> todo
          <ChannelLi channel={channel} key={index} />
        ))
      )}
    </ol>
  );
}
