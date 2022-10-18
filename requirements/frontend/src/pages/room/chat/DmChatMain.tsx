import styles from './ChatMain.module.css';
import backStyle from '../../../components/BackButton.module.css';
import pagestyles from '../../pages.module.css';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currDmRoomState } from '../../../atoms/currDmRoomState';
import { DmChatInfo } from './DmChatInfo';
import { DmChatInput } from './DmChatInput';
import { DmChat } from './DmChat';
import { refreshChannelListState } from '../../../atoms/refreshChannelListState';
import { socket } from '../../../components/Socket/SocketChecker';

export function DmChatMain() {
  const currDmRoom = useRecoilValue(currDmRoomState);

  return (
    <>
      <div className={pagestyles.page}>
        <div className={pagestyles.page__header}>
          <BackRoomButton to='/channel' />
          <div className={styles.chatmain__icons}>
            <LeaveRoomButton uid={currDmRoom?.userId} />
          </div>
        </div>
        <div className={pagestyles.page__main}>
          <DmChatInfo />
          <DmChat />
        </div>
        <div className={pagestyles.page__footer}>
          <DmChatInput />
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

function LeaveRoomButton({ uid }: { uid: number | undefined }) {
  const setRefreshChannelList = useSetRecoilState(refreshChannelListState);
  const setCurrDmRoom = useSetRecoilState(currDmRoomState);

  const onClick = () => {
    if (uid !== undefined) socket.emit('dm/deleteUserInChannel', uid);
    setCurrDmRoom(null);
    setRefreshChannelList(true);
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
