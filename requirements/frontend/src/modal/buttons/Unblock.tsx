import React, * as Reaact from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../atoms/authState';
import { blockedListState } from '../../atoms/blockedListState';
import { chatProfileModalState } from '../../atoms/modals/chatProfileModalState';
import { userProfileModalState } from '../../atoms/modals/userProfileModalState';
import styles from '../UserProfileModal/UserProfileModal.module.css';

export function Unblock() {
  const { token } = useRecoilValue(authState);
  const user =
    useRecoilValue(userProfileModalState) ||
    useRecoilValue(chatProfileModalState); // todo
  const [blockedList, setBlockedList] = useRecoilState(blockedListState);

  if (token === null) throw new Error();
  if (user === undefined) throw new Error();

  const requestBlock = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_EP}/users/block`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id }),
      }
    );

    if (response.status === 200) {
      setBlockedList(blockedList.filter((curr) => curr.id !== user.id));
      return;
    }

    alert('Unblocking Failed');
  };

  const handleBlockClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    requestBlock();
  };

  return (
    <button className={styles.profile__button} onClick={handleBlockClick}>
      Unblock
    </button>
  );
}
