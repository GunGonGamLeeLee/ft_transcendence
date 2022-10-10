import { Link } from 'react-router-dom';
import styles from './ChatMain.module.css';
import pagestyles from '../../pages.module.css';
import { Chat } from './Chat';
import { ChatInput } from './ChatInput';

export function CharMain() {
  return (
    <>
      <div className={styles.page}>
        <div className={pagestyles.page__header}>
          <Link to='/channel'>뒤로가기!</Link>
        </div>
        <div className={pagestyles.page__main}>
          <Chat />
        </div>
        <div className={pagestyles.page__footer}>
          <ChatInput />
        </div>
      </div>
    </>
  );
}
