import Cookies from 'js-cookie';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { io } from 'socket.io-client';
import { authState } from '../../atoms/authState';
import { pendingFriendState } from '../../atoms/friendListState';
import { gameInviteModalState } from '../../atoms/modals/gameInviteModalState';

export const socket = io(`${import.meta.env.VITE_BACKEND_EP}`, {
  autoConnect: false,
});

export function SocketChecker() {
  const navigator = useNavigate();
  const [{ token }, setToken] = useRecoilState(authState);
  const [isConnect, setIsConnect] = React.useState<boolean>(
    socket.connected === true,
  );
  const setPendingFriend = useSetRecoilState(pendingFriendState);
  const setGameInviteModal = useSetRecoilState(gameInviteModalState);
  if (token === null) throw new Error();

  React.useEffect(() => {
    if (socket.connected === true) return;

    socket.auth = { token };
    socket.connect();

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

    socket.on('login/dupCheck', (isSuccess: boolean) => {
      if (isSuccess === true) return;

      socket.disconnect();
      setIsConnect(false);
      Cookies.remove('token');
      setToken({ token: null });
      alert('중복 로그인 감지됨!');
      navigator('/login');
    });

    // socket.onAny((event, ...args) => {
    //   console.debug(`[Log] event: ${event}`);
    //   for (let value of args) {
    //     console.debug(`[Log] arg: ${value}`);
    //   }
    // });

    socket.on('dm/status', (input) => {
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

    socket.on('invite/game', (payload) => {
      setGameInviteModal(payload);
    });

    return () => {
      socket.off('dm/status');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('login/dupCheck');
      socket.off('invite/game');
    };
  }, [setPendingFriend, setIsConnect]);

  return isConnect ? <Outlet /> : <div>connecting</div>;
}
