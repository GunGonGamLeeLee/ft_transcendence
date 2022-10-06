import { useRecoilValue, useRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import { rankListState } from '../../atoms/rankListState';
import { useInterval } from '../../hooks/useInterval';
import UserLi from './UserLi';

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
      }
    );

    const data = await response.json();
    setRankList(data);
  }, 600000);

  return (
    <>
      {rankList.map((user, index) => (
        <UserLi user={user} key={index} isRank={true} />
      ))}
    </>
  );
}
