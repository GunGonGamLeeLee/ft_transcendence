import { Link } from 'react-router-dom';
import styles from './BackButton.module.css';

export function BackButton({ to }: { to: string }) {
  return (
    <div className={styles.back}>
      <Link to={to}>
        <abbr title='뒤로가기'>
          <img src='/back.png' className={styles.back__button} />
        </abbr>
      </Link>
    </div>
  );
}
