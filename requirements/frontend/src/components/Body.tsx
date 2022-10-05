import { useRecoilState } from 'recoil';
import styles from './Body.module.css';

export default function Body({ children }: { children: React.ReactNode }) {
  return <div className={styles.body}>{children}</div>;
}
