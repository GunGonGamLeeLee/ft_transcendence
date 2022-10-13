import React, * as Reaact from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../../atoms/authState';
import { blockedListState } from '../../../atoms/blockedListState';
import { chatProfileModalState } from '../../../atoms/modals/chatProfileModalState';
import { userProfileModalState } from '../../../atoms/modals/userProfileModalState';
import { UserDataType } from '../../../atoms/userDataType';
import styles from './Buttons.module.css';

export function Block() {
  const { token } = useRecoilValue(authState);
  const user: UserDataType | undefined =
    useRecoilValue(userProfileModalState) ||
    useRecoilValue(chatProfileModalState); // todo
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
        body: JSON.stringify({ uid: user.uid }),
      },
    );

    if (response.status === 201) {
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
    <button className={styles.buttons} onClick={handleBlockClick}>
      BLOCK
    </button>
  );
}
