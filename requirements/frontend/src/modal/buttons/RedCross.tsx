import styles from './RedCross.module.css';

export function RedCross({ onClick }: { onClick(): void }) {
  return <div className={styles.redcross} onClick={onClick}></div>;
}
