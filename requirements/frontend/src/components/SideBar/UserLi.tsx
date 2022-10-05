import styles from './UserLi.module.css';
import React, { useState } from 'react';
import UserProfile from './UserProfile';

interface UserInterface {
  userName: string;
  userImg: string;
  userId: number;
  status: number;
}

export default function UserLi({
  user,
  key,
}: {
  user: UserInterface;
  key: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  let userStatus;
  switch (user.status) {
    case 0:
      userStatus = 'online';
      break;
    case 1:
      userStatus = 'chatting';
      break;
    default:
      userStatus = 'gaming';
  }

  return (
    <>
      <li
        className={`${styles.user} ${isOpen ? styles.user__active : ''}`}
        onClick={onClick}
      >
        {key}
        <div className={styles.user_profile__div}>
          <img src={user.userImg} className={styles.user_profile__img} />
          <div className={styles.user_profile__username}>{user.userName}</div>
        </div>
        {/* {user.userId}  */}
        <div>{userStatus}</div>
      </li>
      <div
        className={`${styles.modal} ${
          isOpen ? styles.modal__avtive : styles.modal__inavtive
        }`}
      >
        <UserProfile user={user} onClick={onClick} />
      </div>
    </>
  );
}
