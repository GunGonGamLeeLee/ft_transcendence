import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { friendListState } from '../../atoms/friendListState';
import { UserDataType } from '../../atoms/userDataType';
import { UserProfile } from './Li/UserProfile';
import styles from './Li/UserLi.module.css';

export function FriendList() {
  const friendList = useRecoilValue(friendListState);

  return (
    <>
      {friendList.map((user) => (
        <Friend user={user} key={user.id} />
      ))}
    </>
  );
}

function Friend({ user }: { user: UserDataType }) {
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
          <img src={user.imgUri} className={styles.user_profile__img} />
          <div className={styles.user_profile__username}>
            {user.displayName}
          </div>
        </div>
        <div>{user.status}</div>
      </li>
      <div
        className={`${styles.modal} ${isOpen ? '' : styles.modal__inactive}`}
      >
        <UserProfile user={user} onClick={onClick} />
      </div>
    </>
  );
}
