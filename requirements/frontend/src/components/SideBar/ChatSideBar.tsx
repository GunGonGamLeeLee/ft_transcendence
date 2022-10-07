import * as React from 'react';
import { MyProfile } from './MyProfile';
import styles from './SideBar.module.css';
import ChatUserLi from './Li/ChatUserLi';
import { FriendList } from './FriendList';

interface ChatUserInterface {
  userName: string;
  userImg: string;
  userId: number;
  role: number;
}

const arrayLeft: Array<ChatUserInterface> = [
  {
    userName: 'jaham',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U02LNNC21K3-g6ec2c2bafd0-512',
    userId: 0,
    role: 0,
  },
  {
    userName: 'jeongble',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U03LKK2G48P-82eb599eddd6-512',
    userId: 1,
    role: 1,
  },
];

export default function ChatSideBar() {
  const [isLeft, setIsLeft] = React.useState(true);
  const [arrayL, setArrayL] = React.useState<Array<ChatUserInterface>>();

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

  React.useEffect(() => {
    setArrayL(arrayLeft);
  }, []);

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
          {arrayL === undefined ? (
            <div>loading</div>
          ) : (
            arrayL.map((user, index) => <ChatUserLi user={user} key={index} />)
          )}
        </ul>
        <ul className={isLeft ? styles.hideContent : styles.revealContent}>
          <React.Suspense fallback={<h1>Loading</h1>}>
            {/*need?*/}
            <FriendList />
          </React.Suspense>
        </ul>
      </div>
      <React.Suspense>
        <MyProfile />
      </React.Suspense>
    </div>
  );
}
