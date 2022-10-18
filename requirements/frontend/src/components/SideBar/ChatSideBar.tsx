import * as React from 'react';
import { MyProfile } from './MyProfile';
import { FriendList } from './FriendList';
import { ChatUserList } from './/ChatUserList';
import styles from './SideBar.module.css';

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
      <div
        className={`${styles.sidebar__list} ${isLeft ? '' : styles.inactive}`}
      >
        <Index index1='' index2='NAME' index3='ROLE' />
        <ul className={styles.sidebar__ul}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <ChatUserList />
          </React.Suspense>
        </ul>
      </div>
      <div
        className={`${styles.sidebar__list} ${isLeft ? styles.inactive : ''}`}
      >
        <Index index1='' index2='NAME' index3='STATUS' />
        <ul className={styles.sidebar__ul}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <FriendList />
          </React.Suspense>
        </ul>
      </div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <MyProfile />
      </React.Suspense>
    </div>
  );
}

function Index({
  index1,
  index2,
  index3,
}: {
  index1: string;
  index2: string;
  index3: string;
}) {
  return (
    <div className={styles.sidebar_index}>
      <div className={styles.sidebar__left}>
        <div className={styles.sidebar_index1}>{index1}</div>
        <div className={styles.sidebar_index2}>{index2}</div>
      </div>
      <div className={styles.sidebar_index3}>{index3}</div>
    </div>
  );
}
