import styles from './UserLi.module.css';
import * as React from 'react';
import { UserProfile } from './UserProfile';
import { UserDataType } from '../../../atoms/userDataType';

export function UserLi({
  user,
  isRank,
}: {
  user: UserDataType;
  isRank: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  let userStatus = 'online';
  // switch (0) {
  //   case 0:
  //     userStatus = 'online';
  //     break;
  //   case 1:
  //     userStatus = 'chatting';
  //     break;
  //   default:
  //     userStatus = 'gaming';
  // }

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
        {isRank === true ? <div>{user.rating}</div> : <div>{userStatus}</div>}
      </li>
      <div
        className={`${styles.modal} ${isOpen ? '' : styles.modal__inactive}`}
      >
        <UserProfile user={user} onClick={onClick} />
      </div>
    </>
  );
}
