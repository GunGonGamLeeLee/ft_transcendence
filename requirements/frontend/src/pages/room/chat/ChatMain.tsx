import { Link } from 'react-router-dom';
import styles from './ChatMain.module.css';
import pagestyles from '../../pages.module.css';

export function CharMain() {
  return (
    <>
      <div className={styles.page}>
        <div className={pagestyles.page__header}>
          <Link to='/channel'>뒤로가기!</Link>
        </div>
        <div className={pagestyles.page__main}></div>
        <div className={pagestyles.page__footer}></div>
      </div>
    </>
  );
}
