import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChannelLi from './components/ChannelLi';
import styles from './ChannelLists.module.css';
import pagestyles from '../pages.module.css';
import NewRoom from './components/NewRoom';
import Filter from './components/Filter';
import ChannelList from './ChannelList';

interface ChannelInterface {
  roomId: number;
  title: string;
  owner: string;
  userCount: number;
  lock: boolean;
}

const array: Array<ChannelInterface> = [
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

const array0: Array<ChannelInterface> = [...array, ...array, ...array];

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

export default function ChannelLists() {
  const [filter, setFilter] = useState(0);
  const [isOpen01, setIsOpen01] = useState(false);
  const [all, setAll] = useState<Array<ChannelInterface>>();
  const [joining, setJoining] = useState<Array<ChannelInterface>>();
  const [dm, setDm] = useState<Array<ChannelInterface>>();

  const onClickFilter0 = () => {
    setFilter(0);
  };
  const onClickFilter1 = () => {
    setFilter(1);
  };
  const onClickFilter2 = () => {
    setFilter(2);
  };

  const onClickNew01 = () => {
    setIsOpen01((prev) => !prev);
  };

  useEffect(() => {
    setAll(array0);
    setJoining(array1);
    setDm(array2);
  });
  return (
    <>
      <div className={styles.page}>
        <div className={pagestyles.page__header}>
          <Link to='/lobby'>뒤로가기!</Link>
          <div className={styles.channel__filters}>
            <Filter
              text='모든 채팅방'
              filter={filter === 0}
              onClick={onClickFilter0}
            ></Filter>
            <Filter
              text='참여중인 채팅방'
              filter={filter === 1}
              onClick={onClickFilter1}
            ></Filter>
            <Filter
              text='1대1 채팅방'
              filter={filter === 2}
              onClick={onClickFilter2}
            ></Filter>
          </div>
        </div>
        <div className={pagestyles.page__main}>
          <ChannelList filter={filter} option={0} channelList={all} />
          <ChannelList filter={filter} option={1} channelList={joining} />
          <ChannelList filter={filter} option={2} channelList={dm} />
        </div>
        <div className={pagestyles.page__footer}>
          {/* button */}
          <button className={`${styles.channel__new}`} onClick={onClickNew01}>
            새 채팅방
          </button>
          {/* modal */}
          <div
            className={`${styles.modal} ${
              isOpen01 ? '' : styles.modal__inactive
            }`}
          >
            <NewRoom onClick={onClickNew01} />
          </div>
        </div>
      </div>
    </>
  );
}
