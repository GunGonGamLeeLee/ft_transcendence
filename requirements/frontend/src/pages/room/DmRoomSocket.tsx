import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { blockedListState } from '../../atoms/blockedListState';
import { currDmRoomState } from '../../atoms/currDmRoomState';
import { DmLogState } from '../../atoms/DmLogState';
import { userProfileState } from '../../atoms/userProfileState';
import { socket } from '../../components/Socket/SocketChecker';

export function DmRoomSocket({ children }: { children: React.ReactNode }) {
  const setDmLog = useSetRecoilState(DmLogState);
  const currDmRoom = useRecoilValue(currDmRoomState);
  const blockList = useRecoilValue(blockedListState);
  const userProfile = useRecoilValue(userProfileState);
  const navigator = useNavigate();

  React.useEffect(() => {
    if (currDmRoom === null) navigator('channel');
  }, [currDmRoom]);

  React.useEffect(() => {
    socket.on('dm/msg', (targetUid: number, msg: string) => {
      if (
        blockList.find((blocked) => blocked.uid === currDmRoom?.userId) ===
          undefined ||
        targetUid !== userProfile.uid
      )
        setDmLog((curr) => [...curr, { toUid: targetUid, msg }]);
    });

    return () => {
      socket.off('dm/msg');
    };
  }, [setDmLog]);

  return <>{children}</>;
}
