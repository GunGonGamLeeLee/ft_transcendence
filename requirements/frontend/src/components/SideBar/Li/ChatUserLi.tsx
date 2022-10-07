import styles from './UserLi.module.css';
import * as React from 'react';
import { UserProfile } from './UserProfile';

interface ChatUserInterface {
  userName: string;
  userImg: string;
  userId: number;
  role: number;
}

export default function ChatUserLi({ user }: { user: ChatUserInterface }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  let role: string;
  switch (user.role) {
    case 0:
      role = 'owner';
      break;
    case 1:
      role = 'op';
      break;
    case 2:
      role = '';
      break;
    default:
      role = 'admin';
      break;
  }

  return (
    <>
      <li
        className={`${styles.user} ${isOpen ? styles.user__active : ''}`}
        onClick={onClick}
      >
        <div className={styles.user_profile__div}>
          <img src={user.userImg} className={styles.user_profile__img} />
          <div className={styles.user_profile__username}>{user.userName}</div>
        </div>
        <div>{role}</div>
      </li>
      <div
        className={`${styles.modal} ${isOpen ? '' : styles.modal__inactive}`}
      >
        {/* <UserProfile user={user} onClick={onClick} /> */}
      </div>
    </>
  );
}
