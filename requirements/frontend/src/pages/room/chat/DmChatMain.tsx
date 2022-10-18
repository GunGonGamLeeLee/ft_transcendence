import * as React from 'react';
import styles from './ChatMain.module.css';
import backStyle from '../../../components/BackButton.module.css';
import pagestyles from '../../pages.module.css';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currDmRoomState } from '../../../atoms/currDmRoomState';
import { DmLogState } from '../../../atoms/DmLogState';
import { ChatInput } from './ChatInput';
import { DmChatInfo } from './DmChatInfo';

export function DmChatMain() {
  const currDmRoom = useRecoilValue(currDmRoomState);
  const dmLog = useRecoilValue(DmLogState);

  return (
    <>
      <div className={pagestyles.page}>
        <div className={pagestyles.page__header}>
          <BackRoomButton to='/channel' />
          <div className={styles.chatmain__icons}>
            <LeaveRoomButton />
          </div>
        </div>
        <div className={pagestyles.page__main}>
          <DmChatInfo />
          {/* <Chat /> */}
        </div>
        <div className={pagestyles.page__footer}>
          {/* 아마 dm chat input */}
          <ChatInput />
        </div>
      </div>
    </>
  );
}

function BackRoomButton({ to }: { to: string }) {
  const setCurrDmRoom = useSetRecoilState(currDmRoomState);

  const handleBackClick = () => {
    setCurrDmRoom(null);
  };

  return (
    <div className={styles.back} onClick={handleBackClick}>
      <Link to={to}>
        <abbr title='뒤로가기'>
          <img src='/back.png' className={backStyle.back__button} />
        </abbr>
      </Link>
    </div>
  );
}

function LeaveRoomButton() {
  const setCurrDmRoom = useSetRecoilState(currDmRoomState);

  const onClick = () => {
    setCurrDmRoom(null);
  };

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
