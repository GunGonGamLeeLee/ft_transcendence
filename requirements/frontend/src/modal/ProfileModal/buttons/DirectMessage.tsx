import React, * as Reaact from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../../../atoms/authState';
import { currDmRoomState } from '../../../atoms/currDmRoomState';
import { RoomModeType } from '../../../atoms/currRoomState';
import { userProfileModalState } from '../../../atoms/modals/userProfileModalState';
import { UserDataType } from '../../../atoms/userDataType';
import styles from './Buttons.module.css';

export function DM({ user }: { user: UserDataType }) {
  const setCurrDmRoom = useSetRecoilState(currDmRoomState);
  const navigator = useNavigate();
  const setUserProfileModal = useSetRecoilState(userProfileModalState);

  const handleDmClick = async (e: Reaact.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setCurrDmRoom({
      roomId: `dm${user.uid}`,
      userId: user.uid,
      userDisplayName: user.displayName,
      imgUri: user.imgUri,
      mode: RoomModeType.DM,
    });

    setUserProfileModal(undefined);
    navigator('/channel/dm');
  };

  return (
    <button className={styles.buttons} onClick={handleDmClick}>
      DM
    </button>
  );
}
