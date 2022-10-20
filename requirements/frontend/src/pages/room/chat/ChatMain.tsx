import * as React from 'react';
import styles from './ChatMain.module.css';
import backStyle from '../../../components/BackButton.module.css';
import pagestyles from '../../pages.module.css';
import { Chat } from './Chat';
import { ChatInput } from './ChatInput';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { setRoomModalState } from '../../../atoms/modals/setRoomModalState';
import { userProfileState } from '../../../atoms/userProfileState';
import {
  currBanListState,
  currMuteListState,
  currRoomState,
  currUserListState,
  RoomType,
} from '../../../atoms/currRoomState';
import { ChatInfo } from './ChatInfo';
import { socket } from '../../../components/Socket/SocketChecker';
import { currRoleState } from '../../../atoms/currRoleState';
import { UserDataType } from '../../../atoms/userDataType';
import { getChId } from '../../../utils/getChId';
import { authState } from '../../../atoms/authState';
import { useFetch } from '../../../hooks/useFetch';
import { ChatUserType, RoleType } from '../../../atoms/chatUserType';
import { useInterval } from '../../../hooks/useInterval';
import { currUserCountState } from '../../../atoms/currUserCount';
import { Link, useNavigate } from 'react-router-dom';
import { sortUserByName } from '../../../utils/sortUserByName';

export function ChatMain() {
  const userProfile = useRecoilValue(userProfileState);
  const setCurrUserList = useSetRecoilState(currUserListState);
  const setCurrMuteList = useSetRecoilState(currMuteListState);
  const setCurrBanList = useSetRecoilState(currBanListState);
  const setCurrUserCount = useSetRecoilState(currUserCountState);
  const currRole = useRecoilValue(currRoleState);
  const [isRefresh, setIsRefresh] = React.useState<boolean>(true);
  const fetcher = useFetch();
  const navigator = useNavigate();
  const { token } = useRecoilValue(authState);
  if (token === null) throw new Error();
  const [currRoom, setCurrRoom] = useRecoilState(currRoomState);

  React.useEffect(() => {
    const syncInfo = async () => {
      try {
        const payload: {
          inChatRoom: ChatUserType[];
          muteList: number[];
          banList: number[];
        } = await fetcher(
          token,
          'GET',
          `chat/channelusers?chid=${getChId(currRoom?.roomId)}`,
          undefined,
          true,
        );

        setCurrUserList(payload.inChatRoom.sort(sortUserByName));
        setCurrMuteList(payload.muteList);
        setCurrBanList(payload.banList);
        setCurrUserCount(payload.inChatRoom.length);
        setIsRefresh(false);
      } catch {
        throw new Error();
      }
    };

    if (currRoom === null) {
      navigator('/channel');
    }

    if (isRefresh === false) return;

    try {
      syncInfo();
    } catch {
      alert('불러오기 오류!');
      setCurrRoom(null);
      navigator('/channel');
    }
  }, [isRefresh, currRoom]);

  return currRoom === null ? null : (
    <>
      <div className={pagestyles.page}>
        <div className={pagestyles.page__header}>
          <BackRoomButton to='/channel' />
          <div className={styles.chatmain__icons}>
            {currRoom !== null && currRole !== RoleType.USER ? (
              <SetRoomButton />
            ) : null}
            <LeaveRoomButton user={userProfile} room={currRoom} />
          </div>
        </div>
        <div className={pagestyles.page__main}>
          <ChatInfo />
          <Chat />
        </div>
        <div className={pagestyles.page__footer}>
          <ChatInput />
        </div>
      </div>
    </>
  );
}

function SetRoomButton() {
  const setSetRoomModal = useSetRecoilState(setRoomModalState);
  const onClick = () => {
    setSetRoomModal(true);
  };

  return (
    <div className={styles.chatmain__icon}>
      <abbr title='방 설정'>
        <img
          src='/settings.png'
          onClick={onClick}
          className={styles.chatmain__setting}
        />
      </abbr>
    </div>
  );
}

function LeaveRoomButton({
  user,
  room,
}: {
  user: UserDataType;
  room: RoomType;
}) {
  const navigator = useNavigate();
  const setCurrRoom = useSetRecoilState(currRoomState);
  const currRole = useRecoilValue(currRoleState);
  if (currRole === null) throw new Error();

  const onClick = () => {
    socket.emit('chat/deleteUserInChannel', {
      uid: user.uid,
      chid: getChId(room.roomId),
      role: currRole,
      isMute: false,
      isBan: false,
    });

    setCurrRoom(null);
    navigator('/channel');
  };

  return (
    <div className={styles.chatmain__icon}>
      <abbr title='방 나가기'>
        <img
          src='/leave.png'
          onClick={onClick}
          className={styles.chatmain__leave}
        />
      </abbr>
    </div>
  );
}

function BackRoomButton({ to }: { to: string }) {
  const setCurrRoom = useSetRecoilState(currRoomState);

  const handleBackClick = () => {
    setCurrRoom(null);
  };

  return (
    <div className={styles.back} onClick={handleBackClick}>
      <Link to={to}>
        <abbr title='뒤로가기'>
          <img src='/back.png' className={backStyle.back__button} />
        </abbr>
      </Link>
    </div>
  );
}
