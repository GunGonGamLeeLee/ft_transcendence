import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../atoms/authState';
import { friendListState } from '../../atoms/friendListState';
import { userProfileModalState } from '../../atoms/modals/userProfileModalState';
import styles from '../UserProfileModal/UserProfileModal.module.css';

export function Unfollow() {
  const { token } = useRecoilValue(authState);
  const user = useRecoilValue(userProfileModalState);
  const [friendList, setFriendList] = useRecoilState(friendListState);

  if (token === null) throw new Error();
  if (user === undefined) throw new Error();

  const requestUnfollow = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_EP}/users/unfollow`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id }),
      },
    );

    if (response.status === 200) {
      setFriendList(friendList.filter((curr) => curr.id !== user.id));
      return;
    }

    alert('Unfollow failed');
  };

  const handleUnfollowClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    await requestUnfollow();
  };

  return (
    <button className={styles.profile__button} onClick={handleUnfollowClick}>
      Unfollow
    </button>
  );
}
