import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { blockedListState } from '../../atoms/blockedListState';
import { ChatUserType, RoleType } from '../../atoms/chatUserType';
import { currChatState } from '../../atoms/currChatState';
import { currRoleState } from '../../atoms/currRoleState';
import {
  currBanListState,
  currMuteListState,
  currRoomState,
  currUserListState,
  RoomType,
} from '../../atoms/currRoomState';
import { currUserCountState } from '../../atoms/currUserCount';
import { chatProfileModalState } from '../../atoms/modals/chatProfileModalState';
import { refreshChannelListState } from '../../atoms/refreshChannelListState';
import { userProfileState } from '../../atoms/userProfileState';
import { socket } from '../../components/Socket/SocketChecker';
import { getChId } from '../../utils/getChId';
import { sortUserByName } from '../../utils/sortUserByName';

export function RoomSocket({ children }: { children: React.ReactNode }) {
  const userProfile = useRecoilValue(userProfileState);
  const [currUserList, setCurrUserList] = useRecoilState(currUserListState);
  const [currMuteList, setCurrMuteList] = useRecoilState(currMuteListState);
  const setCurrBanList = useSetRecoilState(currBanListState);
  const [currRoom, setCurrRoom] = useRecoilState(currRoomState);
  const [currRole, setCurrRole] = useRecoilState(currRoleState);
  const [isEnter, setIsEnter] = React.useState<boolean>(true);
  const setCurrUserCount = useSetRecoilState(currUserCountState);
  const [isChange, setIsChange] = React.useState<number>(0);
  const setRefreshChannelList = useSetRecoilState(refreshChannelListState);
  const setChatUserModal = useSetRecoilState(chatProfileModalState);
  const setCurrChatState = useSetRecoilState(currChatState);
  const blockList = useRecoilValue(blockedListState);
  const navigator = useNavigate();

  if (currRole === null) throw new Error();
  if (currRoom === null) throw new Error();

  React.useEffect(() => {
    if (isChange === 0) return;

    setIsChange(0);
    setCurrUserCount((prev) => prev + isChange);
  }, [isChange, setIsChange, setCurrUserCount]);

  React.useEffect(() => {
    if (isEnter === true) {
      socket.emit('chat/addUserInChannel', {
        uid: userProfile.uid,
        chid: getChId(currRoom.roomId),
        role: currRole,
        isMute: false,
        isBan: false,
      });

      setIsEnter(false);
    }

    socket.on('chat/addUserInChannel', (user: ChatUserType) => {
      setCurrUserList((curr) => {
        if (curr.find((currUser) => currUser.uid === user.uid) === undefined) {
          setIsChange(1);
          return [...curr, user].sort(sortUserByName);
        }
        return curr;
      });
    });

    socket.on('chat/deleteUserInChannel', (uid) => {
      setCurrUserList((curr) => curr.filter((user) => user.uid !== uid));
      setIsChange(-1);

      setChatUserModal((curr) => {
        if (curr?.uid === uid) return undefined;
        return curr;
      });

      if (currRoom.ownerId === uid) {
        setCurrRoom(null);
        navigator('/channel');
      }
    });

    socket.on('chat/msg', (chid: number, msg: string, myUid: number) => {
      if (
        currMuteList.find((muted) => muted === myUid) === undefined &&
        blockList.find((blocked) => blocked.uid === myUid) === undefined
      ) {
        setCurrChatState((curr) => [
          ...curr,
          {
            index: curr.length,
            uid: myUid,
            user: currUserList.find((user) => user.uid === myUid),
            msg: msg,
          },
        ]);
      }
    });

    socket.on('chat/addAdmin', (chid: number, targetUid: number) => {
      setCurrUserList((user) =>
        user.map((curr) => {
          if (curr.uid === targetUid) return { ...curr, role: RoleType.ADMIN };
          return curr;
        }),
      );

      if (targetUid === userProfile.uid) setCurrRole(RoleType.ADMIN);
    });

    socket.on('chat/deleteAdmin', (chid: number, targetUid: number) => {
      setCurrUserList((user) =>
        user.map((curr) => {
          if (curr.uid === targetUid) return { ...curr, role: RoleType.USER };
          return curr;
        }),
      );

      if (targetUid === userProfile.uid) setCurrRole(RoleType.USER);
    });

    socket.on('chat/addMute', (chid: number, targetUid: number) => {
      setCurrMuteList((curr) => [...curr, targetUid]);
    });

    socket.on('chat/addBan', (chid: number, targetUid: number) => {
      setCurrBanList((curr) => [...curr, targetUid]);
      setCurrUserList((curr) => curr.filter((user) => user.uid !== targetUid));
      setIsChange(-1);

      if (targetUid === userProfile.uid) {
        setRefreshChannelList(true);
        setCurrRoom(null);
        navigator('/channel');
      }
    });

    // socket.on(
    //   'chat/announce',
    //   (payload: { chid: number; msg: string; }) => {},
    // );

    socket.on('chat/deleteMute', (chid: number, targetUid: number) => {
      setCurrMuteList((curr) => curr.filter((uid) => uid !== targetUid));
    });

    socket.on('chat/deleteBan', (chid: number, targetUid: number) => {
      setCurrBanList((curr) => curr.filter((uid) => uid !== targetUid));
    });

    socket.on('chat/updateChannel', (newRoomInfo: RoomType) => {
      setCurrRoom(newRoomInfo);
    });

    return () => {
      socket.emit('leave', { uid: userProfile.uid });

      socket.off('chat/addUserInChannel');
      socket.off('deleteUserInChannel');
      socket.off('chat/msg');
      socket.off('chat/addAdmin');
      socket.off('chat/deleteAdmin');
      socket.off('chat/addMute');
      socket.off('chat/addBan');
      // socket.off('chat/announce');
      socket.off('chat/deleteMute');
      socket.off('chat/deleteBan');
      socket.off('chat/updateChannel');
    };
  }, [
    userProfile,
    currRoom,
    isEnter,
    setIsEnter,
    currRole,
    currMuteList,
    setCurrMuteList,
    blockList,
  ]);

  return <>{children}</>;
}
