import { useState } from 'react';
import { Link } from 'react-router-dom';
import ChannelLi from './ChannelLi';
import styles from './ChannelList.module.css';

interface ChannelInterface {
  roomId: number;
  title: string;
  owner: string;
  userCount: number;
  lock: boolean;
}

const array0: Array<ChannelInterface> = [
  {
    roomId: 1,
    title: '모든 채팅',
    owner: 'jeongble',
    userCount: 10,
    lock: true,
  },
  {
    roomId: 201,
    title: '자함을 국회로!!!!!!!',
    owner: 'jaham',
    userCount: 99,
    lock: false,
  },
  {
    roomId: 200,
    title: 'cjeon의 Haskell 강의',
    owner: 'cjeon',
    userCount: 10,
    lock: false,
  },
  {
    roomId: 404,
    title: 'ljeongin의 minishell은 언제 끝날 것인가',
    owner: 'rjeongin',
    userCount: 44,
    lock: true,
  },
];

const array1: Array<ChannelInterface> = [
  {
    roomId: 1,
    title: '참여 중인 채팅',
    owner: 'jeongble',
    userCount: 10,
    lock: true,
  },
];

const array2: Array<ChannelInterface> = [
  {
    roomId: 2,
    title: '디에무',
    owner: 'jeongble',
    userCount: 10,
    lock: true,
  },
];

export default function ChannelList() {
  const [filter, setFilter] = useState(0);

  const onClick0 = () => {
    setFilter(0);
  };
  const onClick1 = () => {
    setFilter(1);
  };
  const onClick2 = () => {
    setFilter(2);
  };

  return (
    <div className={styles.channel}>
      <div className={styles.channel__header}>
        <Link to='/lobby'>뒤로가기!</Link>
        <div className={styles.channel__filters}>
          <button onClick={onClick0}>모든 채팅방!</button>
          <button onClick={onClick1}>현재 참여중인 채팅방!</button>
          <button onClick={onClick2}>무수한 DM들</button>
        </div>
      </div>
      <div className={styles.channel__main}>
        <ol
          className={`${styles.channel__list} ${
            filter == 0 ? '' : styles.channel__inactive
          }`}
        >
          {array0.map((channel, index) => (
            <ChannelLi channel={channel} />
          ))}
        </ol>
        <ol
          className={`${styles.channel__list} ${
            filter == 1 ? '' : styles.channel__inactive
          }`}
        >
          {array1.map((channel, index) => (
            <ChannelLi channel={channel} />
          ))}
        </ol>
        <ol
          className={`${styles.channel__list} ${
            filter == 2 ? '' : styles.channel__inactive
          }`}
        >
          {array2.map((channel, index) => (
            <ChannelLi channel={channel} />
          ))}
        </ol>
      </div>
      <div className={styles.channel__footer}>
        <button
          className={`${styles.channel__new} ${
            filter == 0 || filter == 1 ? '' : styles.channel__inactive
          }`}
        >
          새 채팅방!
        </button>
        <button
          className={`${styles.channel__new} ${
            filter == 2 ? '' : styles.channel__inactive
          }`}
        >
          새 DM!
        </button>
      </div>
    </div>
  );
}
