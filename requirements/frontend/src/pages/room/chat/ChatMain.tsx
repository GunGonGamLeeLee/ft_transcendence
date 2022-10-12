import { Link } from 'react-router-dom';
import styles from './ChatMain.module.css';
import pagestyles from '../../pages.module.css';
import { Chat } from './Chat';
import { ChatInput } from './ChatInput';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { setRoomModalState } from '../../../atoms/modals/setRoomModalState';
import { userProfileState } from '../../../atoms/userProfileState';
import { currRoomState } from '../../../atoms/currRoomState';
import { BackButton } from '../../../components/BackButton';

function SetRoomButton() {
  const setSetRoomModal = useSetRecoilState(setRoomModalState);
  const onClick = () => {
    setSetRoomModal(true);
  };

  return (
    <div className={styles.chatmain__icon}>
      <abbr title='방 설정'>
        <img
          src='/settings.png'
          onClick={onClick}
          className={styles.chatmain__setting}
        />
      </abbr>
    </div>
  );
}

function LeaveRoomButton() {
  const onClick = () => {};
  return (
    <div className={styles.chatmain__icon}>
      <abbr title='방 나가기'>
        <img
          src='/leave.png'
          onClick={onClick}
          className={styles.chatmain__leave}
        />
      </abbr>
    </div>
  );
}

export function CharMain() {
  const userProfile = useRecoilValue(userProfileState);
  const currRoom = useRecoilValue(currRoomState);

  return (
    <>
      <div className={pagestyles.page}>
        <div className={pagestyles.page__header}>
          <BackButton to='/channel' />
          <div className={styles.chatmain__icons}>
            {currRoom !== null && userProfile.uid === currRoom.ownerId ? (
              <SetRoomButton />
            ) : null}
            <LeaveRoomButton />
          </div>
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
