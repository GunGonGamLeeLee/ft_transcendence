import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { gameState } from '../../atoms/gameState';
import styles from './Menu.module.css';

export default function Menu() {
  const [game, SetGame] = useRecoilState(gameState);
  const navigator = useNavigate();

  const onChannelClick = async () => {
    // const response = await fetch(`${import.meta.env.VITE_BACKEND_EP}/`);
    // const content = await response.text();
    // console.log(content);
  };

  const onMatchMakeClick = () => {
    SetGame({ mode: 0 });
    navigator('/game');
  };

  const onProfileClick = () => {};

  return (
    <div className={styles.menu}>
      <button className={styles.menu__button} onClick={onMatchMakeClick}>
        PLAY
      </button>
      <Link className={styles.menu__link} to='/channel'>
        <div className={styles.menu__button} onClick={onMatchMakeClick}>
          CHAT
        </div>
      </Link>
    </div>
  );
}
