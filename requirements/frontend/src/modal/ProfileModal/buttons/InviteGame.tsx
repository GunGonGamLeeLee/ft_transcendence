import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { gameState } from '../../../atoms/gameState';
import { chatProfileModalState } from '../../../atoms/modals/chatProfileModalState';
import { userProfileModalState } from '../../../atoms/modals/userProfileModalState';
import { RedCross } from '../../buttons/RedCross';
import styles from './Buttons.module.css';
import modalstyles from './InviteGame.module.css';

export function InviteGame({ uid }: { uid: number }) {
  const [game, setGame] = useRecoilState(gameState);
  const setUserProfileModal = useSetRecoilState(userProfileModalState);
  const setChatProfileModal = useSetRecoilState(chatProfileModalState);
  const navigator = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [speed, setSpeed] = useState('1');

  const onClick = () => {
    setGame({ mode: 1, Id: uid, speed: parseFloat(speed) });
    setIsOpen(false);
    setUserProfileModal(undefined);
    setChatProfileModal(undefined);
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
        INVITE GAME
      </button>
      <div
        className={`${modalstyles.modal} ${
          isOpen ? null : modalstyles.inactive
        }`}
      >
        <div className={modalstyles.modal__blank} onClick={closeModal}></div>
        <div className={modalstyles.speed__}>
          <div className={modalstyles.speed__header}>
            <div className={modalstyles.speed__headertitle}>INVITE GAME</div>
            <RedCross onClick={closeModal} />
          </div>
          <div className={modalstyles.speed__main}>
            <div className={modalstyles.speed__input}>
              <span className={modalstyles.speed__title}>SPEED</span>
              <input
                type='range'
                min='0.5'
                max='4'
                step='0.1'
                value={speed}
                onChange={onChange}
                className={modalstyles.speed__range}
              />
              <span className={modalstyles.speed__value}>x{speed}</span>
            </div>
            <div className={modalstyles.speed__buttons}>
              <button onClick={onClick} className={modalstyles.speed__button}>
                INVITE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
