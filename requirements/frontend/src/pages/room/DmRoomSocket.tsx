import * as React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currDmRoomState } from '../../atoms/currDmRoomState';
import { DmLogState } from '../../atoms/DmLogState';
import { socket } from '../../components/Socket/SocketChecker';

export function DmRoomSocket({ children }: { children: React.ReactNode }) {
  const setDmLog = useSetRecoilState(DmLogState);

  const currDmRoom = useRecoilValue(currDmRoomState);
  if (currDmRoom === null) throw new Error();

  React.useEffect(() => {
    socket.on('dm/msg', (targetUid: number, msg: string) => {
      setDmLog((curr) => [...curr, { targetUid, msg }]);
    });

    return () => {
      socket.off('dm/msg');
    };
  }, [setDmLog]);

  return <>{children}</>;
}
