import styles from './FriendLi.module.css';
import * as React from 'react';
import { UserProfile } from './UserProfile';
import { UserDataType } from '../../../atoms/userDataType';

export default function RankUserLi({
  user,
  rank,
}: {
  user: UserDataType;
  rank: number;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClick = () => {
    setIsOpen((prev) => !prev);
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
      <div
        className={`${styles.modal} ${isOpen ? '' : styles.modal__inactive}`}
      >
        <UserProfile user={user} onClick={onClick} />
      </div>
    </>
  );
}
