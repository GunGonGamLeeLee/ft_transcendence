import * as React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import { ChatUserType } from '../../atoms/chatUserType';
import { currRoleState } from '../../atoms/currRoleState';
import { currRoomState } from '../../atoms/currRoomState';
import { userProfileState } from '../../atoms/userProfileState';
import { chatProfileModalState } from '../../atoms/modals/chatProfileModalState';
import styles from './UserList.module.css';

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

export function ChatUser({ user }: { user: ChatUserType }) {
  const setChatProfile = useSetRecoilState(chatProfileModalState);
  const onClick = () => {
    setChatProfile(user);
  };

  return (
    <li className={`${styles.user}`} onClick={onClick}>
      <div className={styles.user_profile__div}>
        <img src={user.imgUri} className={styles.user_profile__img} />
        <div className={styles.user_profile__username}>{user.displayName}</div>
      </div>
      <div className={styles.user_state__div}>{user.role}</div>
    </li>
  );
}
