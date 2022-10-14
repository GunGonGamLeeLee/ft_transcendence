import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../../atoms/authState';
import { friendListState } from '../../../atoms/friendListState';
import { chatProfileModalState } from '../../../atoms/modals/chatProfileModalState';
import { userProfileModalState } from '../../../atoms/modals/userProfileModalState';
import { UserDataType } from '../../../atoms/userDataType';
import styles from './Buttons.module.css';

export function Follow() {
  const { token } = useRecoilValue(authState);
  const user =
    useRecoilValue(userProfileModalState) ||
    useRecoilValue(chatProfileModalState); // todo
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
        body: JSON.stringify({ uid: user.uid }),
      },
    );

    if (response.status === 201) {
      const newUser: UserDataType = await response.json();
      setFriendList(
        [...friendList, newUser].sort((first, second) => {
          if (first.uid < second.uid) {
            return -1;
          }

          if (first.uid > second.uid) {
            return 1;
          }

          return 0;
        }),
      );
      return;
    }

    alert('Following Failed');
  };

  const handleFollowClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await requestFollow();
  };

  return (
    <button className={styles.buttons} onClick={handleFollowClick}>
      FOLLOW
    </button>
  );
}