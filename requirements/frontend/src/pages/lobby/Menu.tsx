import { Link } from 'react-router-dom';
import styles from './Menu.module.css';

export default function Menu() {
  const onChannelClick = async () => {
    // const response = await fetch(`${import.meta.env.VITE_BACKEND_EP}/`);
    // const content = await response.text();
    // console.log(content);
  };

  const onMatchMakeClick = () => {};

  const onProfileClick = () => {};

  return (
    <div className={styles.menu}>
      <Link className={styles.menu__link} to='/channel'>
        <div className={styles.menu__button} onClick={onMatchMakeClick}>
          PLAY
        </div>
      </Link>
      <Link className={styles.menu__link} to='/channel'>
        <div className={styles.menu__button} onClick={onMatchMakeClick}>
          CHAT
        </div>
      </Link>
    </div>
  );
}
