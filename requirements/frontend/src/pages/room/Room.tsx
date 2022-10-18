import * as React from 'react';
import ChatSideBar from '../../components/SideBar/ChatSideBar';
import { ChatMain } from './chat/ChatMain';
import { useNavigate } from 'react-router-dom';
import {
  currBanListState,
  currMuteListState,
  currRoomState,
  currUserListState,
} from '../../atoms/currRoomState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { RoomSocket } from './RoomSocket';
import { useFetch } from '../../hooks/useFetch';
import { authState } from '../../atoms/authState';
import { getChId } from '../../utils/getChId';
import { ChatUserType, RoleType } from '../../atoms/chatUserType';
import { userProfileState } from '../../atoms/userProfileState';
import { currRoleState } from '../../atoms/currRoleState';
import { currUserCountState } from '../../atoms/currUserCount';
import { refreshChannelListState } from '../../atoms/refreshChannelListState';
import { currChatState } from '../../atoms/currChatState';

export function Room() {
  const [currRoom, setCurrRoom] = useRecoilState(currRoomState);
  const [isFirstRender, setIsFirstRender] = React.useState<boolean>(true);
  const navigator = useNavigate();
  const fetcher = useFetch();
  const userProfile = useRecoilValue(userProfileState);
  const setCurrUserList = useSetRecoilState(currUserListState);
  const setCurrBanList = useSetRecoilState(currBanListState);
  const setCurrMuteList = useSetRecoilState(currMuteListState);
  const setCurrRole = useSetRecoilState(currRoleState);
  const setCurrUserCount = useSetRecoilState(currUserCountState);
  const setRefreshChannelList = useSetRecoilState(refreshChannelListState);
  const setCurrChat = useSetRecoilState(currChatState);
  const { token } = useRecoilValue(authState);
  const [isFetchDone, setIsFetchDone] = React.useState<boolean>(false);
  if (token === null) throw new Error();

  React.useEffect(() => {
    const setDefaultInfo = async () => {
      const payload: {
        inChatRoom: ChatUserType[];
        muteList: number[];
        banList: number[];
      } = await fetcher(
        token,
        'GET',
        `chat/channelusers?chid=${getChId(currRoom?.roomId)}`,
      );

      if (
        payload.banList.find((uid) => uid === userProfile.uid) !== undefined
      ) {
        alert('이 방에서 밴 당했습니다!');
        setCurrRoom(null);
        navigator('/channel', { replace: true });
        return;
      }

      setCurrUserList(payload.inChatRoom);
      setCurrBanList(payload.banList);
      setCurrMuteList(payload.muteList);
      setCurrRole(
        payload.inChatRoom.find((user) => user.uid === userProfile.uid)?.role ??
          RoleType.USER,
      );
      if (currRoom) setCurrUserCount(currRoom.userCount);
      setIsFetchDone(true);
    };

    if (currRoom === null) {
      navigator('/channel', { replace: true });
      return;
    }

    try {
      setDefaultInfo();
    } catch {
      alert('불러오기 오류!');
      setCurrRoom(null);
    }
  }, [currRoom, setCurrRoom]);

  React.useEffect(() => {
    return () => {
      if (isFirstRender === true && import.meta.env.DEV === true) {
        setIsFirstRender(false);
        return;
      }

      setCurrRoom(null);
      setCurrUserList([]);
      setCurrBanList([]);
      setCurrMuteList([]);
      setCurrRole(null);
      setRefreshChannelList(true);
      setCurrChat([]);
    };
  }, [
    isFirstRender,
    setIsFirstRender,
    setCurrRoom,
    setCurrUserList,
    setCurrBanList,
    setCurrMuteList,
    setCurrRole,
    setRefreshChannelList,
    setCurrChat,
  ]);

  return isFetchDone ? (
    <RoomSocket>
      <ChatMain />
      <ChatSideBar />
    </RoomSocket>
  ) : (
    <div>Loading...</div>
  );
}
