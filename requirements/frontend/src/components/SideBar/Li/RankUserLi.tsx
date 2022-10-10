import { UserDataType } from '../../../atoms/userDataType';
import styles from './FriendLi.module.css';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userProfileModalState } from '../../../atoms/userProfileModalState';

export default function RankUserLi({
  user,
  rank,
}: {
  user: UserDataType;
  rank: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const setState = useSetRecoilState(userProfileModalState);
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
          <div className={styles.user__rank}>{rank + 1}</div>
          <div className={styles.user_profile__username}>
            {user.displayName}
          </div>
        </div>
      </li>
    </>
  );
}
