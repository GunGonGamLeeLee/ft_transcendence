import { useState } from 'react';
import MyProfile from './MyProfile';
import styles from './SideBar.module.css';
import UserLi from './UserLi';

interface UserInterface {
  userName: string;
  userImg: string;
  userId: number;
  status: number;
}

const myprofile: UserInterface = {
  userName: 'ADMIN',
  userImg: 'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
  userId: 0,
  status: 0,
};

const arrayLeft: Array<UserInterface> = [
  {
    userName: 'jaham',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U02LNNC21K3-g6ec2c2bafd0-512',
    userId: 0,
    status: 0,
  },
  {
    userName: 'jeongble',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U03LKK2G48P-82eb599eddd6-512',
    userId: 1,
    status: 1,
  },
];

const arrayRight: Array<UserInterface> = [
  {
    userName: 'mypark',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U02KVE0FEBZ-1573f702bcd1-512',
    userId: 2,
    status: 0,
  },
  {
    userName: 'hyojeongkim',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U020HP65S4A-7fa112b147ab-512',
    userId: 3,
    status: 2,
  },
  {
    userName: 'yejukim',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U01GSMNMA6B-e533dfff405b-512',
    userId: 4,
    status: 1,
  },
  {
    userName: 'mypark',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U02KVE0FEBZ-1573f702bcd1-512',
    userId: 2,
    status: 0,
  },
  {
    userName: 'hyojeongkim',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U020HP65S4A-7fa112b147ab-512',
    userId: 3,
    status: 2,
  },
  {
    userName: 'yejukim',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U01GSMNMA6B-e533dfff405b-512',
    userId: 4,
    status: 1,
  },
  {
    userName: 'mypark',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U02KVE0FEBZ-1573f702bcd1-512',
    userId: 2,
    status: 0,
  },
  {
    userName: 'hyojeongkim',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U020HP65S4A-7fa112b147ab-512',
    userId: 3,
    status: 2,
  },
  {
    userName: 'yejukim',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U01GSMNMA6B-e533dfff405b-512',
    userId: 4,
    status: 1,
  },
  {
    userName: 'mypark',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U02KVE0FEBZ-1573f702bcd1-512',
    userId: 2,
    status: 0,
  },
  {
    userName: 'hyojeongkim',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U020HP65S4A-7fa112b147ab-512',
    userId: 3,
    status: 2,
  },
  {
    userName: 'yejukim',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U01GSMNMA6B-e533dfff405b-512',
    userId: 4,
    status: 1,
  },
  {
    userName: 'mypark',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U02KVE0FEBZ-1573f702bcd1-512',
    userId: 2,
    status: 0,
  },
  {
    userName: 'hyojeongkim',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U020HP65S4A-7fa112b147ab-512',
    userId: 3,
    status: 2,
  },
  {
    userName: 'yejukim',
    userImg: 'https://ca.slack-edge.com/T039P7U66-U01GSMNMA6B-e533dfff405b-512',
    userId: 4,
    status: 1,
  },
];

export default function SideBar() {
  const [isLeft, setIsLeft] = useState(true);

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
          RANK
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
          {arrayLeft.map((user, index) => (
            <UserLi user={user} key={index} />
          ))}
        </ul>
        <ul className={isLeft ? styles.hideContent : styles.revealContent}>
          {arrayRight.map((user, index) => (
            <UserLi user={user} key={index} />
          ))}
        </ul>
      </div>
      <MyProfile user={myprofile} />
    </div>
  );
}
