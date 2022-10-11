import { useRecoilValue } from 'recoil';
import { userProfileState } from '../../../atoms/userProfileState';
import styles from './Chat.module.css';

interface ChatType {
  uid: number;
  displayName: string;
  imgUri: string;
  msg: string;
}

const array1: Array<ChatType> = [
  {
    uid: 2,
    displayName: 'jeongble',
    imgUri: 'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
    msg: 'hi',
  },
  {
    uid: 2,
    displayName: 'jeongble',
    imgUri: 'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
    msg: 'hi',
  },
  {
    uid: 3,
    displayName: 'yeju',
    imgUri: 'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
    msg: 'hihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihi',
  },
  {
    uid: 99945,
    displayName: 'jaham',
    imgUri: 'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
    msg: 'hi',
  },
  {
    uid: 99945,
    displayName: 'jaham',
    imgUri: 'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
    msg: '안녕하세요. 이자함입니다. 안녕하세요. 이자함입니다. 안녕하세요. 이자함입니다. 안녕하세요. 이자함입니다. 안녕하세요. 이자함입니다. 안녕하세요. 이자함입니다. 안녕하세요. 이자함입니다. 안녕하세요. 이자함입니다. 안녕하세요. 이자함입니다. 안녕하세요. 이자함입니다. ',
  },
];

const array2: Array<ChatType> = [...array1, ...array1, ...array1, ...array1];

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
        <div className={`${styles.chat__msg} ${styles.chat__left}`}>
          {info.msg}
        </div>
      </div>
    </>
  );
}

function RightChat({
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
        <div className={`${styles.chat__profile} ${styles.chat__right}`}>
          <div className={styles.chat__name}>{info.displayName}</div>
          <img src={info.imgUri} className={styles.chat__img} />
        </div>
      )}
      <div className={`${styles.chat__msgbox} ${styles.chat__right}`}>
        <div className={`${styles.chat__msg} ${styles.chat__right}`}>
          {info.msg}
        </div>
      </div>
    </>
  );
}

export function Chat() {
  const userProfile = useRecoilValue(userProfileState);
  let lastId: number | undefined;
  let tempId: number | undefined;
  return (
    <div className={styles.chatbox}>
      {array2.map((info, key) => {
        tempId = lastId;
        lastId = info.uid;
        return info.uid === userProfile.uid ? (
          <RightChat info={info} lastId={tempId} key={key} />
        ) : (
          <LeftChat info={info} lastId={tempId} key={key} />
        );
      })}
    </div>
  );
}
