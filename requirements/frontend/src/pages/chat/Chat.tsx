import { Link, Navigate, useParams } from 'react-router-dom';
import Chatroom from './Chatroom';
import { useEffect, useState } from 'react';
import ChatSideBar from '../../components/SideBar/ChatSideBar';

interface ChatroomInterface {
  title: string;
  owner: number;
  operators: Array<number>;
  users: Array<number>;
  password: boolean;
  private: boolean;
}

const roooom: ChatroomInterface = {
  title: '으으ㅇ아ㅏㅏ아아아아아아아아앙앙ㄱㄱ',
  owner: 1,
  operators: [1, 2, 3],
  users: [1, 2, 3, 4],
  password: true,
  private: false,
};

export function Chat() {
  const [roomInfo, setRoomInfo] = useState<ChatroomInterface>();
  const { id } = useParams();

  useEffect(() => {
    //get Room Info from API
    setRoomInfo(roooom);
  });

  if (id === undefined) {
    return <Navigate to='channel' />;
  }

  return (
    <>
      {roomInfo === undefined ? (
        'Loading'
      ) : (
        <>
          <Chatroom roomInfo={roomInfo} />
          <ChatSideBar />
        </>
      )}
    </>
  );
}
