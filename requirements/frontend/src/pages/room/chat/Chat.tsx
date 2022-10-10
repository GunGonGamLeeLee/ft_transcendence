import styles from './Chat.module.css';

interface ChatType {
  id: number;
  displayName: string;
  imgUri: string;
  msg: string;
}

export function Chat() {
  return <div className={styles.chat}></div>;
}
