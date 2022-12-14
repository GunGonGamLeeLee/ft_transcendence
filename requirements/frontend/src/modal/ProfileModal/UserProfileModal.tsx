import * as React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Status, UserDataType } from '../../atoms/userDataType';
import { userProfileModalState } from '../../atoms/modals/userProfileModalState';
import { userProfileState } from '../../atoms/userProfileState';
import { friendListState } from '../../atoms/friendListState';
import { Follow } from './buttons/Follow';
import { blockedListState } from '../../atoms/blockedListState';
import { Block } from './buttons/Block';
import styles from './ProfileModal.module.css';
import modalstyles from '../Modal.module.css';
import { Unblock } from './buttons/Unblock';
import { RedCross } from '../buttons/RedCross';
import { currRoomState } from '../../atoms/currRoomState';
import { MatchHistoryList } from './MatchHistoryList';
import { authState } from '../../atoms/authState';
import {
  matchHistoryListState,
  requestMatchHistory,
} from '../../atoms/modals/matchHistoryListState';
import { InviteGame } from './buttons/InviteGame';
import { DM } from './buttons/DirectMessage';
import { InviteRoom } from './buttons/InviteRoom';
import { SpecGame } from './buttons/SpecGame';

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
  const currRoom = useRecoilValue(currRoomState);
  const friendList = useRecoilValue(friendListState);
  const blockedList = useRecoilValue(blockedListState);
  const [isBlocked, setIsBlocked] = React.useState<boolean>(false);
  const setMatchHistory = useSetRecoilState(matchHistoryListState);

  const { token } = useRecoilValue(authState);
  if (token === null) throw new Error();

  const onClick = () => {
    setState(undefined);
  };

  React.useEffect(() => {
    setIsBlocked(
      blockedList.find((curr) => curr.uid === user.uid) !== undefined,
    );
  }, [friendList, blockedList]);

  React.useEffect(() => {
    const matchHistoryQuery = async () => {
      const newHistory = await requestMatchHistory(token, user.uid);
      setMatchHistory(newHistory);
    };

    matchHistoryQuery();

    return setMatchHistory([]);
  }, [token, user]);

  return (
    <>
      <div className={modalstyles.modal}>
        <div className={modalstyles.modal__blank} onClick={onClick}></div>
        <div className={styles.profile}>
          <div className={modalstyles.modal__header}>
            <span className={modalstyles.modal__headertitle}>PROFILE</span>
            <RedCross onClick={onClick} />
          </div>
          <div className={styles.profile__display}>
            <img src={user.imgUri} className={styles.profile__img} />
            <div className={styles.profile__text}>
              <div className={styles.profile__name}>{user.displayName}</div>
              <div className={styles.profile__rating}>
                Rating: {user.rating}
              </div>
            </div>
          </div>
          <MatchHistoryList myUid={user.uid} />
          {userProfile.uid === user.uid ? (
            <></>
          ) : (
            <>
              {currRoom && currRoom.ownerId === userProfile.uid ? (
                <div className={styles.profile__buttons}>
                  <InviteRoom uid={user.uid} />
                </div>
              ) : null}
              <div className={styles.profile__buttons}>
                <Follow />
                {!isBlocked ? <Block /> : <Unblock />}
              </div>
              {user.status !== Status.RANK ? (
                <div className={styles.profile__buttons}>
                  {user.status === Status.ONLINE ? (
                    <InviteGame uid={user.uid} />
                  ) : user.status === Status.GAMING ? (
                    <SpecGame uid={user.uid} />
                  ) : null}
                  <DM user={user} />
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </>
  );
}
