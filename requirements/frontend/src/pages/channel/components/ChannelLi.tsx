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
    <li className={styles.li__li}>
      <div className={styles.li__id}>{channel.roomId}</div>
      <div className={`${styles.li__title}`}>{channel.title}</div>
      <div className={`${styles.li__owner}`}>{channel.owner}</div>
      <div className={`${styles.li__count}`}>{channel.userCount}명</div>
      <div className={`${styles.li__count}`}>
        {channel.lock ? 'lock' : 'unlock'}
      </div>
    </li>
  );
}
