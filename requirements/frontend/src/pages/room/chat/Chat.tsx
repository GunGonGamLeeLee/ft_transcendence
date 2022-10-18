import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ChatUserType } from '../../../atoms/chatUserType';
import { ChatLogType, currChatState } from '../../../atoms/currChatState';
import { currUserListState } from '../../../atoms/currRoomState';
import { userProfileState } from '../../../atoms/userProfileState';
import styles from './Chat.module.css';

function LeftChat({
  chat,
  user,
  lastId,
}: {
  chat: ChatLogType;
  user: ChatUserType | undefined;
  lastId: number | undefined;
}) {
  return (
    <>
      {chat.uid === lastId ? (
        <></>
      ) : (
        <div className={`${styles.chat__profile} ${styles.chat__left}`}>
          {user === undefined ? null : (
            <img src={user.imgUri} className={styles.chat__img} />
          )}
          {user === undefined ? (
            'unknown'
          ) : (
            <div className={styles.chat__name}>{user.displayName}</div>
          )}
        </div>
      )}
      <div className={styles.chat__msgbox}>
        <div className={`${styles.chat__msg}`}>{chat.msg}</div>
      </div>
    </>
  );
}

function RightChat({ chat }: { chat: ChatLogType }) {
  return (
    <>
      <div className={`${styles.chat__msgbox} ${styles.chat__right}`}>
        <div className={`${styles.chat__msg} ${styles.chat__msg__right}`}>
          {chat.msg}
        </div>
      </div>
    </>
  );
}

export function Chat() {
  const { uid: myUid } = useRecoilValue(userProfileState);
  const currUserList = useRecoilValue(currUserListState);
  const currChat = useRecoilValue(currChatState);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current === null) return;
    if (currChat.slice(-1)[0]?.uid !== myUid) return;

    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [scrollRef, currChat]);

  let lastId: number | undefined;
  let tempId: number | undefined;
  return (
    <div className={styles.chatbox}>
      {currChat.map((chat) => {
        tempId = lastId;
        lastId = chat.uid;
        return chat.uid === myUid ? (
          <RightChat chat={chat} key={chat.index} />
        ) : (
          <LeftChat
            chat={chat}
            user={currUserList.find((user) => user.uid === chat.uid)}
            lastId={tempId}
            key={chat.index}
          />
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
}
