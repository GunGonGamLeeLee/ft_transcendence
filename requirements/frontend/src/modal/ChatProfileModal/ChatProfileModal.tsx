import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { blockedListState } from '../../atoms/blockedListState';
import { ChatUserType } from '../../atoms/chatUserType';
import { currRoleState } from '../../atoms/currRoleState';
import { friendListState } from '../../atoms/friendListState';
import { chatProfileModalState } from '../../atoms/modals/chatProfileModalState';
import { userProfileState } from '../../atoms/userProfileState';
import { Follow } from '../buttons/Follow';
import { Unfollow } from '../buttons/Unfollow';
import { Block } from '../buttons/Block';
import { Unblock } from '../buttons/Unblock';
import { RedCross } from '../buttons/RedCross';
import styles from './ChatProfileModal.module.css';
import modalstyles from '../Modal.module.css';

export function ChatProfileModal() {
  const chatProfileModal = useRecoilValue(chatProfileModalState);

  return (
    <>
      {chatProfileModal === undefined ? (
        <></>
      ) : (
        <ChatProfile user={chatProfileModal} />
      )}
    </>
  );
}

function ChatProfile({ user }: { user: ChatUserType }) {
  const setChatProfileModal = useSetRecoilState(chatProfileModalState);
  const currRole = useRecoilValue(currRoleState);
  const userProfile = useRecoilValue(userProfileState);
  const friendList = useRecoilValue(friendListState);
  const blockedList = useRecoilValue(blockedListState);
  const [isFriend, setIsFriend] = React.useState<boolean>(false);
  const [isBlocked, setIsBlocked] = React.useState<boolean>(false);

  const onClick = () => {
    setChatProfileModal(undefined);
  };

  React.useEffect(() => {
    setIsFriend(friendList.find((curr) => curr.uid === user.uid) !== undefined);
    setIsBlocked(
      blockedList.find((curr) => curr.uid === user.uid) !== undefined,
    );
  }, [friendList, blockedList]);

  return (
    <>
      <div className={modalstyles.modal}>
        <div className={modalstyles.modal__blank} onClick={onClick}></div>
        <div className={styles.profile}>
          <div className={styles.profile__header}>
            <span className={styles.profile__headertitle}>PROFILE</span>
            <RedCross onClick={onClick} />
          </div>
          <div className={styles.profile__display}>
            <img src={user.imgUri} className={styles.profile__img} />
            <div>
              <div className={styles.profile__name}>{user.displayName}</div>
              <div className={styles.profile__rating}>
                Rating: {user.rating}
              </div>
            </div>
          </div>
          <div className={styles.profile__stat}>매칭 기록이 없습니다.</div>
          {userProfile.uid === user.uid ? (
            <></>
          ) : (
            <>
              <div className={styles.profile__buttons}>
                {currRole === 'owner' ? (
                  <ProfileButton text='임명/해임' />
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.profile__buttons}>
                {currRole === 'owner' ||
                (currRole === 'admin' && user.role === 'user') ? (
                  <>
                    <ProfileButton text='BAN' />
                    <ProfileButton text='MUTE' />
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.profile__buttons}>
                {!isFriend ? <Follow /> : <Unfollow />}
                {!isBlocked ? <Block /> : <Unblock />}
              </div>
              <div className={styles.profile__buttons}>
                <ProfileButton text='대전' />
                <ProfileButton text='DM' />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function ProfileButton({ text }: { text: string }) {
  return <button className={styles.profile__button}>{text}</button>;
}
