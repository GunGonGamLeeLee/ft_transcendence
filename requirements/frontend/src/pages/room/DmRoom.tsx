import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import { currDmRoomState } from '../../atoms/currDmRoomState';
import { DmLogState, DmLogType } from '../../atoms/DmLogState';
import { dmTargetState } from '../../atoms/dmTargetState';
import { refreshChannelListState } from '../../atoms/refreshChannelListState';
import { UserDataType } from '../../atoms/userDataType';
import { SideBar } from '../../components/SideBar/SideBar';
import { useFetch } from '../../hooks/useFetch';
import { DmChatMain } from './chat/DmChatMain';
import { DmRoomSocket } from './DmRoomSocket';

export function DmRoom() {
  const fetcher = useFetch();
  const setDmLog = useSetRecoilState(DmLogState);
  const setRefreshChannelList = useSetRecoilState(refreshChannelListState);
  const setDmTarget = useSetRecoilState(dmTargetState);
  const [currDmRoom, setCurrDmRoom] = useRecoilState(currDmRoomState);
  const [isFirstRender, setIsFirstRender] = React.useState<boolean>(true);
  const [isFetchDone, setIsFetchDone] = React.useState<boolean>(false);
  const navigator = useNavigate();
  const { token } = useRecoilValue(authState);
  if (token === null) throw new Error();

  React.useEffect(() => {
    const requestDmLog = async () => {
      try {
        const { target, logs }: { target: UserDataType; logs: DmLogType[] } =
          await fetcher(
            token,
            'GET',
            `dm/log?target_uid=${currDmRoom?.userId}`,
          );

        setDmLog(logs);
        setDmTarget(target);
      } catch {
        throw new Error();
      }
    };

    if (currDmRoom === null) {
      navigator('/channel');
      return;
    }

    try {
      requestDmLog();
      setIsFetchDone(true);
    } catch {
      setCurrDmRoom(null);
    }
  }, [setDmLog, token, fetcher, setDmTarget, currDmRoom, setIsFetchDone]);

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

  return isFetchDone ? (
    <DmRoomSocket>
      <DmChatMain />
      <SideBar />
    </DmRoomSocket>
  ) : (
    <div>LOADING</div>
  );
}
