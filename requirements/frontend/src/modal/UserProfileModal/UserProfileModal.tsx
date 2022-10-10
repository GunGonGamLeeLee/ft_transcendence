import * as React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { UserDataType } from '../../atoms/userDataType';
import { userProfileModalState } from '../../atoms/modals/userProfileModalState';
import { userProfileState } from '../../atoms/userProfileState';
import { friendListState } from '../../atoms/friendListState';
import { Follow } from '../buttons/Follow';
import { Unfollow } from '../buttons/Unfollow';
import { blockedListState } from '../../atoms/blockedListState';
import { Block } from '../buttons/Block';
import styles from './UserProfileModal.module.css';
import modalstyles from '../Modal.module.css';
import { Unblock } from '../buttons/Unblock';

export function UserProfileModal() {
  const userProfileModal = useRecoilValue(userProfileModalState);

  return (
    <>
      {userProfileModal === undefined ? (
        <></>
      ) : (
        <UserProfile user={userProfileModal} />
      )}
    </>
  );
}

function UserProfile({ user }: { user: UserDataType }) {
  const setState = useSetRecoilState(userProfileModalState);
  const userProfile = useRecoilValue(userProfileState);
  const friendList = useRecoilValue(friendListState);
  const blockedList = useRecoilValue(blockedListState);
  const [isFriend, setIsFriend] = React.useState<boolean>(false);
  const [isBlocked, setIsBlocked] = React.useState<boolean>(false);

  const onClick = () => {
    setState(undefined);
  };

  React.useEffect(() => {
    setIsFriend(friendList.find((curr) => curr.id === user.id) !== undefined);
    setIsBlocked(blockedList.find((curr) => curr.id === user.id) !== undefined);
  }, [friendList, blockedList]);

  // fetch and set user
  return (
    <>
      <div className={modalstyles.modal}>
        <div className={styles.profile__blank} onClick={onClick}></div>
        <div className={styles.profile}>
          <div className={styles.profile__header}>
            <div className={styles.profile__redcross} onClick={onClick}></div>
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
          {userProfile.id === user.id ? (
            <></>
          ) : (
            <>
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
