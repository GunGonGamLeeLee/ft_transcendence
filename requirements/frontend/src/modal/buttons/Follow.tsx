import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../atoms/authState';
import { friendListState } from '../../atoms/friendListState';
import { userProfileModalState } from '../../atoms/modals/userProfileModalState';
import styles from '../UserProfileModal/UserProfileModal.module.css';

export function Follow() {
  const { token } = useRecoilValue(authState);
  const user = useRecoilValue(userProfileModalState); // todo
  const [friendList, setFriendList] = useRecoilState(friendListState);

  if (token === null) throw new Error();
  if (user === undefined) throw new Error();

  const requestFollow = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_EP}/users/follow`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id }),
      },
    );

    if (response.status === 201) {
      setFriendList([...friendList, user]);
      return;
    }

    alert('Following Failed');
  };

  const handleFollowClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await requestFollow();
  };

  return (
    <button className={styles.profile__button} onClick={handleFollowClick}>
      Follow
    </button>
  );
}
