import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { io } from 'socket.io-client';
import { authState } from '../../atoms/authState';
import { pendingFriendState } from '../../atoms/friendListState';

export const socket = io(`${import.meta.env.VITE_BACKEND_EP}`, {
  autoConnect: false,
});

export function SocketChecker() {
  const { token } = useRecoilValue(authState);
  if (token === null) throw new Error();

  const [isConnect, setIsConnect] = React.useState<boolean>(
    socket.connected === true,
  );
  const setPendingFriend = useSetRecoilState(pendingFriendState);

  React.useEffect(() => {
    if (socket.connected === true) return;

    socket.auth = { token };
    socket.connect();
    console.debug('initial');

    return () => {
      socket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    socket.on('connect', () => {
      setIsConnect(true);
    });

    socket.on('disconnect', (reason) => {
      console.debug(`disconnect reason: ${reason}`);
      setIsConnect(false);
    });

    socket.onAny((event, ...args) => {
      console.debug(`[Log] event: ${event}`);
      for (let value of args) {
        console.debug(`[Log] arg: ${value}`);
      }
    });

    socket.on('dm/status', (input) => {
      console.debug(input);
      setPendingFriend((curr) => [
        ...curr,
        {
          data: {
            displayName: input.displayName,
            uid: input.uid,
            status: input.status,
            rating: input.rating,
            imgUri: input.imgUri,
          },
          isAdd: true,
        },
      ]);
    });

    return () => {
      socket.off('dm/status');
      socket.off('test');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [setPendingFriend, setIsConnect]);

  return isConnect ? <Outlet /> : <div>connecting</div>;
}
