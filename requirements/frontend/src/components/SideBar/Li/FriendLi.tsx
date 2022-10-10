import styles from './FriendLi.module.css';
import { UserDataType } from '../../../atoms/userDataType';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userProfileModalState } from '../../../atoms/userProfileModalState';

export default function FriendLi({ user }: { user: UserDataType }) {
  const setState = useSetRecoilState(userProfileModalState);
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setState(user.id);
  };

  return (
    <>
      <li
        className={`${styles.user} ${isOpen ? styles.user__active : ''}`}
        onClick={onClick}
      >
        <div className={styles.user_profile__div}>
          <img src={user.imgUri} className={styles.user_profile__img} />
          <div className={styles.user_profile__username}>
            {user.displayName}
          </div>
        </div>
        {/* {user.userId}  */}
        <div>{user.status}</div>
      </li>
    </>
  );
}
