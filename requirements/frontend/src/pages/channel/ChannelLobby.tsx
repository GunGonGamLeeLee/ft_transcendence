import * as React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import { Link } from 'react-router-dom';
import { FilterButton } from './components/FilterButton';
import { filterState } from '../../atoms/filterState';
import { RoomList } from './components/RoomList';
import { RoomType } from '../../atoms/currRoomState';
import { newRoomModalState } from '../../atoms/modals/newRoomModalState';
import {
  allRoomListState,
  dmRoomListState,
  joinedRoomListState,
} from '../../atoms/roomListState';
import styles from './ChannelLobby.module.css';
import pagestyles from '../pages.module.css';
import { BackButton } from '../../components/BackButton';

export function ChannelLobby() {
  const [allRoomList, setAllRoomList] = useRecoilState(allRoomListState);
  const [joinedRoomList, setJoinedRoomList] =
    useRecoilState(joinedRoomListState);
  const [dmRoomList, setDmRoomList] = useRecoilState(dmRoomListState);
  const { token } = useRecoilValue(authState);
  const [isRefresh, setIsRefresh] = React.useState<boolean>(true);
  const filter = useRecoilValue(filterState);
  const setNewRoomModal = useSetRecoilState(newRoomModalState);

  const onClickNew = () => {
    setNewRoomModal(true);
  };

  const handleRefreshClick = (e: React.MouseEvent) => {
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
          <BackButton to='/lobby' />
          <div className={styles.channel__filters}>
            <div className={styles.channel__refresh}>
              <abbr title='새로고침'>
                <img
                  src='/refresh.png'
                  onClick={handleRefreshClick}
                  className={styles.channel__refreshi}
                />
              </abbr>
            </div>

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
          <div className={styles.channel__newdiv}>
            <button className={`${styles.channel__new}`} onClick={onClickNew}>
              NEW ROOM
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
