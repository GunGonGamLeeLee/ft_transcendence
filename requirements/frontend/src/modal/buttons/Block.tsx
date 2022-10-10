import React, * as Reaact from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../atoms/authState';
import { blockedListState } from '../../atoms/blockedListState';
import { userProfileModalState } from '../../atoms/modals/userProfileModalState';
import styles from '../UserProfileModal/UserProfileModal.module.css';

export function Block() {
  const { token } = useRecoilValue(authState);
  const user = useRecoilValue(userProfileModalState); // todo
  const [blockedList, setBlockedList] = useRecoilState(blockedListState);

  if (token === null) throw new Error();
  if (user === undefined) throw new Error();

  const requestBlock = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_EP}/users/block`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id }),
      },
    );

    if (response.status === 200) {
      setBlockedList([...blockedList, user]);
      return;
    }

    alert('Blocking Failed');
  };

  const handleBlockClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    requestBlock();
  };

  return (
    <button className={styles.profile__button} onClick={handleBlockClick}>
      Block
    </button>
  );
}
