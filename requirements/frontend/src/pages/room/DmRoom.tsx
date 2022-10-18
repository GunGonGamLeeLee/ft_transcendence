import * as React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import { currDmRoomState } from '../../atoms/currDmRoomState';
import { DmLogState } from '../../atoms/DmLogState';
import { refreshChannelListState } from '../../atoms/refreshChannelListState';
import { useFetch } from '../../hooks/useFetch';
import { DmRoomSocket } from './DmRoomSocket';

export function DmRoom() {
  const fetcher = useFetch();
  const setDmLog = useSetRecoilState(DmLogState);
  const setRefreshChannelList = useSetRecoilState(refreshChannelListState);
  const [currDmRoom, setCurrDmRoom] = useRecoilState(currDmRoomState);
  if (currDmRoom === null) throw new Error();
  const [isFirstRender, setIsFirstRender] = React.useState<boolean>(true);
  const { token } = useRecoilValue(authState);
  if (token === null) throw new Error();

  React.useEffect(() => {
    const requestDmLog = async () => {
      const logs = await fetcher(
        token,
        'GET',
        `dm/log?target_uid=${currDmRoom.userId}`,
      );

      setDmLog({ ...logs });
    };

    requestDmLog();
  }, [setDmLog, token, fetcher]);

  React.useEffect(() => {
    return () => {
      if (isFirstRender === true && import.meta.env.DEV === true) {
        setIsFirstRender(false);
        return;
      }

      setCurrDmRoom(null);
      setRefreshChannelList(true);
    };
  }, [isFirstRender, setIsFirstRender, setCurrDmRoom, setRefreshChannelList]);

  return (
    <DmRoomSocket>
      <DmChatmain />
    </DmRoomSocket>
  );
}
