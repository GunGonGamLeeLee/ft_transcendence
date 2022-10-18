import * as React from 'react';
import styles from './ChatMain.module.css';
import backStyle from '../../../components/BackButton.module.css';
import pagestyles from '../../pages.module.css';
import { Chat } from './Chat';
import { ChatInput } from './ChatInput';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
import { ChatUserType } from '../../../atoms/chatUserType';
import { useInterval } from '../../../hooks/useInterval';
import { currUserCountState } from '../../../atoms/currUserCount';
import { Link, useNavigate } from 'react-router-dom';

export function ChatMain() {
  const userProfile = useRecoilValue(userProfileState);
  const setCurrUserList = useSetRecoilState(currUserListState);
  const setCurrMuteList = useSetRecoilState(currMuteListState);
  const setCurrBanList = useSetRecoilState(currBanListState);
  const setCurrUserCount = useSetRecoilState(currUserCountState);
  const [isRefresh, setIsRefresh] = React.useState<boolean>(true);
  const fetcher = useFetch();
  const { token } = useRecoilValue(authState);
  if (token === null) throw new Error();
  const currRoom = useRecoilValue(currRoomState);
  if (currRoom === null) throw new Error();

  React.useEffect(() => {
    const syncInfo = async () => {
      const payload: {
        inChatRoom: ChatUserType[];
        muteList: number[];
        banList: number[];
      } = await fetcher(
        token,
        'GET',
        `chat/channelusers?chid=${getChId(currRoom.roomId)}`,
        undefined,
        true,
      );

      setCurrUserList(payload.inChatRoom);
      setCurrMuteList(payload.muteList);
      setCurrBanList(payload.banList);
      setCurrUserCount(payload.inChatRoom.length);
      setIsRefresh(false);
    };

    if (isRefresh === false) return;

    syncInfo();
  }, [isRefresh]);

  useInterval(() => {
    setIsRefresh(true);
  }, 50000);

  return (
    <>
      <div className={pagestyles.page}>
        <div className={pagestyles.page__header}>
          <BackRoomButton to='/channel' />
          <div className={styles.chatmain__icons}>
            {currRoom !== null && userProfile.uid === currRoom.ownerId ? (
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
