import styles from './ChannelLi.module.css';

interface ChannelInterface {
  roomId: number;
  title: string;
  owner: string;
  userCount: number;
  lock: boolean;
}

export default function ChannelLi({ channel }: { channel: ChannelInterface }) {
  return (
    <li className={styles.li}>
      <div className={styles.li__roomId}>{channel.roomId}</div>
      <div className={styles.li__roomId}>{channel.title}</div>
    </li>
  );
}
