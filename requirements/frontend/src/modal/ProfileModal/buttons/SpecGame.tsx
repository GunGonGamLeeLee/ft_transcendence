import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gameState } from '../../../atoms/gameState';
import styles from './Buttons.module.css';

export function SpecGame({ uid }: { uid: number }) {
  const [game, SetGame] = useRecoilState(gameState);
  const navigator = useNavigate();

  const onClick = () => {
    SetGame({ mode: 3, Id: uid });
    navigator('/game');
  };

  return (
    <button className={styles.buttons} onClick={onClick}>
      SPEC
    </button>
  );
}
