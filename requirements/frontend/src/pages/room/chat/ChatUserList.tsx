import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../../atoms/authState';
import { ChatUserType } from '../../../atoms/chatUserType';
import { currRoleState } from '../../../atoms/currRoleState';
import { currRoomState } from '../../../atoms/currRoomState';
import { userProfileState } from '../../../atoms/userProfileState';
import { ChatUser } from './ChatUser';

export function ChatUserList() {
  const [chatUserList, setChatUserList] = React.useState<ChatUserType[]>([]);
  const { token } = useRecoilValue(authState);
  const currRoom = useRecoilValue(currRoomState);
  const [currRole, setCurrRole] = useRecoilState(currRoleState);
  const userProfile = useRecoilValue(userProfileState);

  if (currRoom === null) return null;
  const roomId = currRoom.roomId;

  React.useEffect(() => {
    const requestChatUserList = async (roomId: number) => {
      if (token === null) throw new Error();

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_EP}/channel/users?roomId=${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error();

      const data: ChatUserType[] = await response.json();
      setChatUserList(data);
      const myrole = data.find((curr) => curr.uid === userProfile.uid);
      if (myrole) {
        setCurrRole(myrole.role);
      } else {
        throw new Error();
      }
    };

    requestChatUserList(roomId);
  }, [roomId]);

  return (
    <>
      {chatUserList.map((user) => (
        <ChatUser user={user} key={user.uid} />
      ))}
    </>
  );
}
