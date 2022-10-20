import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currDmRoomState } from '../../../atoms/currDmRoomState';
import { DmLogState, DmLogType } from '../../../atoms/DmLogState';
import { friendListState } from '../../../atoms/friendListState';
import { isScrollRefreshState } from '../../../atoms/isScrollRefresh';
import { UserDataType } from '../../../atoms/userDataType';
import { userProfileState } from '../../../atoms/userProfileState';
import styles from './Chat.module.css';

function LeftChat({
  log,
  lastId,
}: {
  log: DmLogType;
  lastId: number | undefined;
}) {
  const currDmRoom = useRecoilValue(currDmRoomState);
  const navigator = useNavigate();

  React.useEffect(() => {
    if (currDmRoom === null) navigator('/channel');
  }, [currDmRoom]);

  return (
    <>
      {log.toUid === lastId ? (
        <></>
      ) : (
        <div className={`${styles.chat__profile} ${styles.chat__left}`}>
          <img src={currDmRoom?.imgUri} className={styles.chat__img} />
          <div className={styles.chat__name}>{currDmRoom?.userDisplayName}</div>
        </div>
      )}
      <div className={styles.chat__msgbox}>
        <div className={`${styles.chat__msg}`}>{log.msg}</div>
      </div>
    </>
  );
}

function RightChat({ log }: { log: DmLogType }) {
  return (
    <>
      <div className={`${styles.chat__msgbox} ${styles.chat__right}`}>
        <div className={`${styles.chat__msg} ${styles.chat__msg__right}`}>
          {log.msg}
        </div>
      </div>
    </>
  );
}

export function DmChat() {
  const { uid: myUid } = useRecoilValue(userProfileState);
  const dmLog = useRecoilValue(DmLogState);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const userProfile = useRecoilValue(userProfileState);
  const [currRoom, setCurrDmRoom] = useRecoilState(currDmRoomState);
  const [isRefresh, setIsRefresh] = useRecoilState(isScrollRefreshState);
  const navigator = useNavigate();

  React.useEffect(() => {
    if (currRoom === null) {
      navigator('/channel');
      return;
    }

    dmLog.forEach((log) => {
      if (currRoom?.userId !== log.toUid && userProfile.uid !== log.toUid) {
        setCurrDmRoom(null);
        navigator('/channel');
        return;
      }
    });
  }, [currRoom, setIsRefresh]);

  // React.useEffect(() => {
  //   if (scrollRef.current === null) return;
  //   if (isRefresh === false) return;

  //   scrollRef.current.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'end',
  //   });

  //   setIsRefresh(false);
  // }, [scrollRef, dmLog, isRefresh, setIsRefresh]);

  let lastId: number | undefined;
  let tempId: number | undefined;
  return (
    <div className={styles.chatbox}>
      {dmLog.map((log, index) => {
        tempId = lastId;
        lastId = log.toUid;
        return log.toUid !== myUid ? (
          <RightChat log={log} key={index} />
        ) : (
          <LeftChat log={log} lastId={tempId} key={index} />
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
}
