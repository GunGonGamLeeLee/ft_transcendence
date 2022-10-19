import { useRecoilValue } from 'recoil';
import { matchHistoryListState } from '../../atoms/modals/matchHistoryListState';
import styles from './MatchHistoryList.module.css';

export function MatchHistoryList({ myUid }: { myUid: number }) {
  const matchHistoryList = useRecoilValue(matchHistoryListState);

  return (
    <div className={styles.history}>
      <h1 className={styles.history__title}>MATCH HISTORY</h1>
      <ul className={styles.history__ul}>
        {matchHistoryList.length !== 0 ? (
          <>
            {matchHistoryList.map((curr) => (
              <li key={curr.index} className={styles.history__li}>
                <div className={styles.history__mode}>
                  {curr.isRank ? 'R' : 'F'}
                </div>
                <div className={styles.history__op}>
                  <span className={styles.history__op_vs}>vs </span>
                  <span className={styles.history__op_name}>
                    {curr.winner.uid === myUid
                      ? curr.loser.displayName
                      : curr.winner.displayName}
                  </span>
                </div>
                {curr.winner.uid === myUid ? (
                  <div
                    className={`${styles.history__result} ${styles.history__win}`}
                  >
                    WIN
                  </div>
                ) : (
                  <div
                    className={`${styles.history__result} ${styles.history__lose}`}
                  >
                    LOSE
                  </div>
                )}
              </li>
            ))}
          </>
        ) : (
          <span className={`${styles.history__li} ${styles.history__no}`}>
            NO HISTORY
          </span>
        )}
      </ul>
      <div className={styles.history__footer}>
        <p>R: Rank F: Friendly</p>
        <p>Displayed recent 5 results</p>
      </div>
    </div>
  );
}
