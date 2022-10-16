import * as React from 'react';
import { useRecoilState } from 'recoil';
import {
  friendListState,
  pendingFriendState,
} from '../../atoms/friendListState';
import { UserDataType } from '../../atoms/userDataType';
import { useSetRecoilState } from 'recoil';
import { userProfileModalState } from '../../atoms/modals/userProfileModalState';
import { Status } from '../../atoms/userDataType';
import styles from './UserList.module.css';
import { useIsModalActive } from '../../hooks/useIsModalActive';
import { sortUserByName } from '../../utils/sortUserByName';

export function FriendList() {
  const [friendList, setFriendList] = useRecoilState(friendListState);
  const [pending, setPending] = useRecoilState(pendingFriendState);
  const isModalActive = useIsModalActive();
  const [rendering, setRendering] = React.useState<UserDataType[]>([]);

  React.useEffect(() => {
    if (isModalActive === true) return;

    if (pending.length !== 0) {
      pending.forEach((curr) => {
        if (curr.isAdd === true) {
          friendList.set(curr.data.uid, curr.data);
        } else {
          friendList.delete(curr.data.uid);
        }
      });

      setFriendList(new Map(friendList));
      setPending([]);
    }
  }, [pending, isModalActive, setPending, friendList, setFriendList]);

  React.useEffect(() => {
    const newRendering = Array.from(friendList, (curr) => curr[1]);
    newRendering.sort(sortUserByName);

    setRendering(newRendering);
  }, [friendList]);

  return (
    <>
      {rendering.map((user) => (
        <Friend user={user} key={user.uid} />
      ))}
    </>
  );
}

function Friend({ user }: { user: UserDataType }) {
  const setUserProfile = useSetRecoilState(userProfileModalState);

  const onClick = () => {
    setUserProfile(user);
  };

  return (
    <li className={styles.user} onClick={onClick}>
      <div className={styles.user_profile__div}>
        <img src={user.imgUri} className={styles.user_profile__img} />
        <div className={styles.user_profile__username}>{user.displayName}</div>
      </div>
      <div className={styles.user_state__div}>
        {user.status === Status.OFFLINE
          ? 'offline'
          : user.status === Status.ONLINE
          ? 'online'
          : 'gaming'}
      </div>
    </li>
  );
}
