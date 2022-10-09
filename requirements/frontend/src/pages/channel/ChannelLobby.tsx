import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../../atoms/authState';
import { Link } from 'react-router-dom';
import { FilterButton } from './components/FilterButton';
import { filterState } from '../../atoms/filterState';
import styles from './ChannelLobby.module.css';
import pagestyles from '../pages.module.css';
import { RoomList } from './components/RoomList';
import NewRoom from './components/NewRoom';

export interface RoomType {
  roomId: number;
  title: string;
  owner: string;
  userCount: number;
  lock: boolean;
}

export function ChannelLobby() {
  const [isOpen01, setIsOpen01] = React.useState(false); // need?

  const [allRoomList, setAllRoomList] = React.useState<RoomType[]>([]);
  const [joinedRoomList, setJoinedRoomList] = React.useState<RoomType[]>([]);
  const [dmRoomList, setDmRoomList] = React.useState<RoomType[]>([]);
  const { token } = useRecoilValue(authState);
  const [isRefresh, setIsRefresh] = React.useState<boolean>(true);
  const filter = useRecoilValue(filterState);

  const onClickNew01 = () => {
    setIsOpen01((prev) => !prev);
  };

  const handleRefreshClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsRefresh(true);
  };

  const useSetChatRooms = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_EP}/channel/totalList`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) throw new Error();

    const data: { all: RoomType[]; joined: RoomType[]; dm: RoomType[] } =
      await response.json();

    setAllRoomList(data.all);
    setJoinedRoomList(data.joined);
    setDmRoomList(data.dm);
  };

  React.useEffect(() => {
    if (isRefresh === false) return;

    useSetChatRooms();
    setIsRefresh(false);
  }, [isRefresh]);

  return (
    <>
      <div className={styles.page}>
        <div className={pagestyles.page__header}>
          <Link to='/lobby'>뒤로가기!</Link>
          <button onClick={handleRefreshClick}>refresh</button>
          <div className={styles.channel__filters}>
            <FilterButton
              text='모든 채팅방'
              type='all'
              isActive={filter === 'all'}
            />
            <FilterButton
              text='참여중인 채팅방'
              type='joined'
              isActive={filter === 'joined'}
            />
            <FilterButton
              text='1대1 채팅방'
              type='dm'
              isActive={filter === 'dm'}
            />
          </div>
        </div>
        <div className={pagestyles.page__main}>
          <RoomList roomList={allRoomList} isActive={filter === 'all'} />
          <RoomList roomList={joinedRoomList} isActive={filter === 'joined'} />
          <RoomList roomList={dmRoomList} isActive={filter === 'dm'} />
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
