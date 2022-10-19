import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { UserProfileModal } from './ProfileModal/UserProfileModal';
import { ChatProfileModal } from './ProfileModal/ChatProfileModal';
import { GameInviteModal } from './InviteModal/GameInviteModal';
import { UserSettingModal } from './UserSettingModal/UserSettingModal';
import { NewRoomModal } from './NewRoomModal/NewRoomModal';
import { SetRoomModal } from './SetRoomModal/SetRoomModal';

export function Modal() {
  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        <UserProfileModal />
      </React.Suspense>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ChatProfileModal />
      </React.Suspense>
      <GameInviteModal />
      <NewRoomModal />
      <SetRoomModal />
      <UserSettingModal />
      <Outlet />
    </>
  );
}
