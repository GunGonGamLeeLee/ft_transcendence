import * as React from 'react';
import { UserDataType } from '../../../atoms/userDataType';
import styles from '../../../components/SideBar/Li/UserLi.module.css';
import { UserProfile } from '../../../components/SideBar/Li/UserProfile';

type roleType = 'owner' | 'op' | 'admin'; // todo

export interface ChatUserType extends UserDataType {
  role: roleType;
}

export function ChatUser({ user }: { user: ChatUserType }) {
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
        <div>{user.role}</div>
      </li>
      <div
        className={`${styles.modal} ${isOpen ? '' : styles.modal__inactive}`}
      >
        <UserProfile user={user} onClick={onClick} />
      </div>
    </>
  );
}
