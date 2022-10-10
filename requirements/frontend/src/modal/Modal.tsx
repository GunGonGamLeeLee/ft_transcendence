import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userProfileModalState } from '../atoms/modals/userProfileModalState';
import { NewRoomModal } from './NewRoomModal/NewRoomModal';
import { SetRoomModal } from './SetRoomModal/SetRoomModal';
import { UserProfileModal } from './UserProfileModal/UserProfileModal';
import { UserSettingModal } from './UserSettingModal/UserSettingModal';

export function Modal() {
  const userProfileModal = useRecoilValue(userProfileModalState);

  return (
    <>
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <UserProfileModal />
      </React.Suspense>
      <NewRoomModal />
      <SetRoomModal />
      <UserSettingModal />
      <Outlet />
    </>
  );
}
