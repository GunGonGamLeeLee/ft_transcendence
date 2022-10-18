import * as React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatUserType, RoleType } from '../../atoms/chatUserType';
import { currUserListState } from '../../atoms/currRoomState';
import { chatProfileModalState } from '../../atoms/modals/chatProfileModalState';
import styles from './UserList.module.css';

export function ChatUserList() {
  const currUserList = useRecoilValue(currUserListState);

  return (
    <>
      {currUserList.map((user) => (
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
      <div className={styles.user_state__div}>
        {user.role === RoleType.OWNER
          ? 'owner'
          : user.role === RoleType.ADMIN
          ? 'admin'
          : 'user'}
      </div>
    </li>
  );
}
