import * as React from 'react';
import { SideBar } from '../../components/SideBar/SideBar';
import { ChannelLobby } from './ChannelLobby';

export function Channel() {
  return (
    <>
      <React.Suspense fallback={<div>Loading</div>}>
        <ChannelLobby />
      </React.Suspense>
      <SideBar />
    </>
  );
}
