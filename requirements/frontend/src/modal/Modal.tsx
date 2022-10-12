import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { UserProfileModal } from './UserProfileModal/UserProfileModal';
import { ChatProfileModal } from './ChatProfileModal/ChatProfileModal';
import { ChatInviteModal } from './InviteModal/ChatInviteModal';
import { GameInviteModal } from './InviteModal/GameInviteModal';
import { UserSettingModal } from './UserSettingModal/UserSettingModal';
import { NewRoomModal } from './NewRoomModal/NewRoomModal';
import { SetRoomModal } from './SetRoomModal/SetRoomModal';

export function Modal() {
  return (
    <>
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <UserProfileModal />
      </React.Suspense>
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <ChatProfileModal />
      </React.Suspense>
      <ChatInviteModal />
      <GameInviteModal />
      <NewRoomModal />
      <SetRoomModal />
      <UserSettingModal />
      <Outlet />
    </>
  );
}
