import { Link } from 'react-router-dom';
import styles from './ChatMain.module.css';
import pagestyles from '../../pages.module.css';
import { Chat } from './Chat';
import { ChatInput } from './ChatInput';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { setRoomModalState } from '../../../atoms/modals/setRoomModalState';
import { userProfileState } from '../../../atoms/userProfileState';
import { currRoomState } from '../../../atoms/currRoomState';

function SetRoomButton() {
  const setSetRoomModal = useSetRecoilState(setRoomModalState);
  const onClick = () => {
    setSetRoomModal(true);
  };

  return (
    <img
      src='/settings.png'
      onClick={onClick}
      className={styles.chatmain__setting}
    />
  );
}

export function CharMain() {
  const userProfile = useRecoilValue(userProfileState);
  const currRoom = useRecoilValue(currRoomState);

  return (
    <>
      <div className={styles.page}>
        <div className={pagestyles.page__header}>
          <Link to='/channel'>뒤로가기!</Link>
          {currRoom !== null && userProfile.id === currRoom.ownerId ? (
            <SetRoomButton />
          ) : (
            <></>
          )}
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
