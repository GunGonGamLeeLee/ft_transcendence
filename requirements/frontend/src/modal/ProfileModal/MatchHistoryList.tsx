import { useRecoilValue } from 'recoil';
import { matchHistoryListState } from '../../atoms/modals/matchHistoryListState';
import { userProfileState } from '../../atoms/userProfileState';
import styles from './ProfileModal.module.css';

export function MatchHistoryList({ myUid }: { myUid: number }) {
  const matchHistoryList = useRecoilValue(matchHistoryListState);

  return matchHistoryList.length !== 0 ? (
    <ul className={styles.profile__stat}>
      {matchHistoryList.map((curr) => (
        <li key={curr.index}>
          {curr.isRank ? '랭크' : '친선'} 게임{' '}
          {curr.winner.uid === myUid
            ? curr.loser.displayName
            : curr.winner.displayName}
          {curr.winner.uid === myUid ? ' 승' : ' 패'}
        </li>
      ))}
    </ul>
  ) : (
    <h1 className={styles.profile__stat}>No History!</h1>
  );
}
