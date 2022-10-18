import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gameState } from '../../../atoms/gameState';
import { RedCross } from '../../buttons/RedCross';
import styles from './Buttons.module.css';
import modalstyles from './InviteGame.module.css';

export function InviteGame({ uid }: { uid: number }) {
  const [game, setGame] = useRecoilState(gameState);
  const navigator = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [speed, setSpeed] = useState('1');

  const onClick = () => {
    setGame({ mode: 1, Id: uid, speed: parseFloat(speed) });
    setIsOpen(false);
    navigator('/game');
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(event.target.value);
  };

  return (
    <>
      <button className={styles.buttons} onClick={openModal}>
        GAME
      </button>
      <div
        className={`${modalstyles.modal} ${
          isOpen ? null : modalstyles.inactive
        }`}
      >
        <div className={modalstyles.modal__blank} onClick={closeModal}></div>
        <div className={modalstyles.speed}>
          <div className={modalstyles.speed__header}>
            <div className={modalstyles.speed__headertitle}>INVITE GAME</div>
            <RedCross onClick={closeModal} />
          </div>
          <input
            type='range'
            min='0.5'
            max='4'
            step='0.1'
            value={speed}
            onChange={onChange}
          />
          <span>{speed}</span>
          <button onClick={onClick}>gogo</button>
        </div>
      </div>
    </>
  );
}
