import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../../../atoms/authState';
import { currRoomState } from '../../../atoms/currRoomState';

export function RoomChecker() {
  const { token } = useRecoilValue(authState);
  const currRoom = useRecoilValue(currRoomState);
  const navigator = useNavigate();

  React.useEffect(() => {
    if (token === null) throw new Error();
    if (currRoom === null) navigator('/channel', { replace: true });
  }, [token, currRoom]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form === null) return;

    const formData = new FormData(form);
    const password = formData.get('password');

    if (password === null) return;
    if (typeof password !== 'string') return;

    if (currRoom === null) throw new Error();

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_EP}/channel/auth?roomId=${
        currRoom.roomId
      }&password=${password}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      alert('fail!');
      navigator('/channel');
      return;
    }

    navigator('/channel/room', { replace: true });
  };

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigator('/channel', { replace: true });
  };

  return (
    <>
      <p>Room Password</p>
      <form onSubmit={handleSubmit}>
        <input name='password' type='password' />
        <button type='submit'>submit</button>
      </form>
      <button onClick={handleCancelClick}>cancel</button>
    </>
  );
}
