import * as React from 'react';
import ChatSideBar from './chat/ChatSideBar';
import { CharMain } from './chat/ChatMain';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currRoomState } from '../../atoms/currRoomState';
import { authState } from '../../atoms/authState';

export function Room() {
  const [currRoom, setCurrRoom] = useRecoilState(currRoomState);
  const [isEnter, setIsEnter] = React.useState<boolean>(true);
  const { token } = useRecoilValue(authState);
  const navigator = useNavigate();

  if (currRoom === null) {
    return <Navigate to='/channel' replace={true} />;
  }

  React.useEffect(() => {
    const requestConnectRoom = async () => {
      // todo: socket
      // maybe need token, currRoom info
      return true;
    };

    if (isEnter === true) {
      requestConnectRoom().then((res) => {
        if (res === false) navigator('/channel');
      });
    }

    return () => {
      if (isEnter === true) {
        setIsEnter(false);
        return;
      }

      setCurrRoom(null);
      console.log('clean connection here'); // todo
    };
  }, [currRoom, isEnter]);

  return (
    <>
      <CharMain />
      <ChatSideBar />
    </>
  );
}
