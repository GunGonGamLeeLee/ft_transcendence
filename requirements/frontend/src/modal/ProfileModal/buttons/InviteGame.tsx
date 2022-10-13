import React, * as Reaact from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../../atoms/authState';
import { blockedListState } from '../../../atoms/blockedListState';
import { chatProfileModalState } from '../../../atoms/modals/chatProfileModalState';
import { userProfileModalState } from '../../../atoms/modals/userProfileModalState';
import styles from './Buttons.module.css';

export function InviteGame() {
  return <button className={styles.buttons}>GAME</button>;
}
