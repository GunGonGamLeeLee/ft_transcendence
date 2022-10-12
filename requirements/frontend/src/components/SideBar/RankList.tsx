import { useRecoilValue, useRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import { rankListState } from '../../atoms/rankListState';
import { useInterval } from '../../hooks/useInterval';
import { UserDataType } from '../../atoms/userDataType';
import styles from './UserList.module.css';
import { useSetRecoilState } from 'recoil';
import { userProfileModalState } from '../../atoms/modals/userProfileModalState';

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
  }, 10000);

  return (
    <>
      {rankList.map((user, index) => (
        <Rank user={user} index={index} key={user.uid} />
      ))}
    </>
  );
}

export function Rank({ user, index }: { user: UserDataType; index: number }) {
  const setState = useSetRecoilState(userProfileModalState);
  const onClick = () => {
    setState(user);
  };

  return (
    <>
      <li className={styles.user} onClick={onClick}>
        <div className={styles.user_profile__div}>
          <div className={styles.user__rank}>{index + 1}</div>
          <div className={styles.user_profile__username}>
            {user.displayName}
          </div>
        </div>
        <div className={styles.user_state__div}>{user.rating}</div>
      </li>
    </>
  );
}
