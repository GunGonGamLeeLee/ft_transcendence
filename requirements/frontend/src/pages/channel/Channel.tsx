import * as React from 'react';
import { SideBar } from '../../components/SideBar/SideBar';
import { Modal } from '../../modal/Modal';
import { ChannelLobby } from './ChannelLobby';

export function Channel() {
  return (
    <>
      <React.Suspense fallback={<h1>Loading</h1>}>
        <ChannelLobby />
      </React.Suspense>
      <SideBar />
    </>
  );
}
