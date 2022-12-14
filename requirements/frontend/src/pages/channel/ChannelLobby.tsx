import * as React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
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
import { DmList } from './components/DmList';
import { useInterval } from '../../hooks/useInterval';
import { sortRoomByTitle } from '../../utils/sortRoomByTitle';
import { sortRoomByUser } from '../../utils/sortRoomByUser';
import { DmRoomType } from '../../atoms/currDmRoomState';
import { refreshChannelListState } from '../../atoms/refreshChannelListState';

export function ChannelLobby() {
  const [allRoomList, setAllRoomList] = useRecoilState(allRoomListState);
  const [joinedRoomList, setJoinedRoomList] =
    useRecoilState(joinedRoomListState);
  const [dmRoomList, setDmRoomList] = useRecoilState(dmRoomListState);
  const { token } = useRecoilValue(authState);
  const [isRefresh, setIsRefresh] = useRecoilState(refreshChannelListState);
  const filter = useRecoilValue(filterState);
  const setNewRoomModal = useSetRecoilState(newRoomModalState);
  if (token === null) throw new Error();

  const onClickNew = () => {
    setNewRoomModal(true);
  };

  const handleRefreshClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRefresh(true);
  };

  const useSetChatRooms = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_EP}/chat/channel`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) throw new Error();

    const data: {
      allRoom: RoomType[];
      inRoom: RoomType[];
      dmRoom: DmRoomType[];
    } = await response.json();

    setAllRoomList(data.allRoom.sort(sortRoomByTitle));
    setJoinedRoomList(data.inRoom.sort(sortRoomByTitle));
    setDmRoomList(data.dmRoom.sort(sortRoomByUser));
  };

  React.useEffect(() => {
    if (isRefresh === false) return;

    useSetChatRooms();
    setIsRefresh(false);
  }, [isRefresh]);

  useInterval(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_EP}/chat/channel`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) throw new Error();

    const data: {
      allRoom: RoomType[];
      inRoom: RoomType[];
      dmRoom: DmRoomType[];
    } = await response.json();

    setAllRoomList(data.allRoom.sort(sortRoomByTitle));
    setJoinedRoomList(data.inRoom.sort(sortRoomByTitle));
    setDmRoomList(data.dmRoom.sort(sortRoomByUser));
  }, 3000);

  return (
    <>
      <div className={styles.page}>
        <div className={pagestyles.page__header}>
          <BackButton to='/lobby' />
        </div>
        <div className={pagestyles.page__main}>
          <div className={styles.channel__filters}>
            <div className={styles.channel__refresh}>
              <abbr title='????????????'>
                <img
                  src='/refresh.png'
                  onClick={handleRefreshClick}
                  className={styles.channel__refreshi}
                />
              </abbr>
            </div>

            <FilterButton
              text='?????? ?????????'
              type='all'
              isActive={filter === 'all'}
            />
            <FilterButton
              text='???????????? ?????????'
              type='joined'
              isActive={filter === 'joined'}
            />
            <FilterButton
              text='1???1 ?????????'
              type='dm'
              isActive={filter === 'dm'}
            />
          </div>
          <RoomList roomList={allRoomList} isActive={filter === 'all'} />
          <RoomList roomList={joinedRoomList} isActive={filter === 'joined'} />
          <DmList dmRoomList={dmRoomList} isActive={filter === 'dm'} />
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
