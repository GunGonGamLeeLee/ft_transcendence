import * as React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import { rankListState } from '../../atoms/rankListState';
import { useInterval } from '../../hooks/useInterval';
import { UserDataType } from '../../atoms/userDataType';
import { UserProfile } from './Li/UserProfile';
import styles from './Li/UserLi.module.css';

export function RankList() {
  const { token } = useRecoilValue(authState);
  const [rankList, setRankList] = useRecoilState(rankListState);

  useInterval(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_EP}/users/rank`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) throw new Error();

    const data = await response.json();
    setRankList(data);
  }, 600000);

  return (
    <>
      {rankList.map((user, index) => (
        <Rank user={user} index={index} key={user.id} />
      ))}
    </>
  );
}

function Rank({ user, index }: { user: UserDataType; index: number }) {
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
          <div className={styles.user__rank}>{index + 1}</div>
          <div className={styles.user_profile__username}>
            {user.displayName}
          </div>
        </div>
        <div>{user.rating}</div>
      </li>
      <div
        className={`${styles.modal} ${isOpen ? '' : styles.modal__inactive}`}
      >
        <UserProfile user={user} onClick={onClick} />
      </div>
    </>
  );
}
