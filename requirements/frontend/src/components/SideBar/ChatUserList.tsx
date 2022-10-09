import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../../atoms/authState';
import { ChatUser, ChatUserType } from './ChatUser';

export function ChatUserList() {
  const [chatUserList, setChatUserList] = React.useState<ChatUserType[]>([]);
  const { token } = useRecoilValue(authState);
  const roomId = 1; // todo: change after chat room logic settle

  React.useEffect(() => {
    const requestChatUserList = async (roomId: number) => {
      if (token === null) throw new Error();

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_EP}/channel?id=${roomId}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error();

      const data: ChatUserType[] = await response.json();
      setChatUserList(data);
    };

    requestChatUserList(roomId);
  }, [roomId]);

  return (
    <>
      {chatUserList.map((user) => (
        <ChatUser user={user} key={user.id} />
      ))}
    </>
  );
}
