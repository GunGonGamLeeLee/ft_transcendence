import { useRecoilState, useRecoilValue } from 'recoil';
import { currChatState } from '../../../atoms/currChatState';
import { userProfileState } from '../../../atoms/userProfileState';
import styles from './Chat.module.css';

function LeftChat({
  info,
  lastId,
}: {
  info: ChatType;
  lastId: number | undefined;
}) {
  return (
    <>
      {info.uid === lastId ? (
        <></>
      ) : (
        <div className={`${styles.chat__profile} ${styles.chat__left}`}>
          <img src={info.imgUri} className={styles.chat__img} />
          <div className={styles.chat__name}>{info.displayName}</div>
        </div>
      )}
      <div className={styles.chat__msgbox}>
        <div className={`${styles.chat__msg}`}>{info.msg}</div>
      </div>
    </>
  );
}

function RightChat({ info }: { info: ChatType }) {
  return (
    <>
      <div className={`${styles.chat__msgbox} ${styles.chat__right}`}>
        <div className={`${styles.chat__msg} ${styles.chat__msg__right}`}>
          {info.msg}
        </div>
      </div>
    </>
  );
}

export function Chat() {
  const userProfile = useRecoilValue(userProfileState);
  const currChat = useRecoilState(currChatState);
  // 백엔드에서 어떻게 관리하냐에 따라 다르게 처리해야함... 내가 보낸 메세지를 바로 띄울것인지 / 받아와서 띄울것인지

  let lastId: number | undefined;
  let tempId: number | undefined;
  return (
    <div className={styles.chatbox}>
      {/* {array2.map((info, key) => {
        tempId = lastId;
        lastId = info.uid;
        return info.uid === userProfile.uid ? (
          <RightChat info={info} key={key} />
        ) : (
          <LeftChat info={info} lastId={tempId} key={key} />
        );
      })} */}
    </div>
  );
}
