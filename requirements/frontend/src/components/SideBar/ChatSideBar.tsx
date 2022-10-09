import * as React from 'react';
import { MyProfile } from './MyProfile';
import styles from './SideBar.module.css';
import { FriendList } from './FriendList';
import { ChatUserList } from './ChatUserList';

export default function ChatSideBar() {
  const [isLeft, setIsLeft] = React.useState(true);

  const onLeftClick = () => {
    if (!isLeft) {
      setIsLeft(true);
    }
  };

  const onRightClick = () => {
    if (isLeft) {
      setIsLeft(false);
    }
  };

  return (
    <div className={styles.sidebar}>
      <ol className={styles.sidebar__nav}>
        <li
          className={`${styles.sidebar__tab} ${
            isLeft ? styles.sidebar__avtive : styles.sidebar__inavtive
          }`}
          onClick={onLeftClick}
        >
          CHAT
        </li>
        <li
          className={`${styles.sidebar__tab} ${
            isLeft ? styles.sidebar__inavtive : styles.sidebar__avtive
          }`}
          onClick={onRightClick}
        >
          FRIEND
        </li>
      </ol>
      <div className={styles.sidebar__contentlist}>
        <ul className={isLeft ? styles.revealContent : styles.hideContent}>
          <React.Suspense fallback={<h1>Loading</h1>}>
            <ChatUserList />
          </React.Suspense>
        </ul>
        <ul className={isLeft ? styles.hideContent : styles.revealContent}>
          <React.Suspense fallback={<h1>Loading</h1>}>
            <FriendList />
          </React.Suspense>
        </ul>
      </div>
      <React.Suspense fallback={<h1>Loading</h1>}>
        <MyProfile />
      </React.Suspense>
    </div>
  );
}
