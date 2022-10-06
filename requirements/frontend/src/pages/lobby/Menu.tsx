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
    <div className={styles.Menu}>
      <button onClick={onMatchMakeClick}>match make</button>
      <button onClick={onChannelClick}>
        <Link to='/channel'>channel</Link>
      </button>
    </div>
  );
}
