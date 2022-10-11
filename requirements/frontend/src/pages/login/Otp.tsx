import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import Cookies from 'js-cookie';

export function Otp() {
  const setAuthState = useSetRecoilState(authState);
  const navigator = useNavigate();
  const [count, setCount] = React.useState<number>(0);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form === null) return;

    const formData = new FormData(form);
    const pin = formData.get('pin');

    if (pin === null) return;
    if (typeof pin !== 'string') return;

    try {
      const { token } = await requestOtpAuth({ pin });
      setAuthState({ token });
    } catch (err) {
      setCount(count + 1);

      if (count === 5) {
        navigator('/', { replace: true });
        return;
      }
    }
  };

  return (
    <>
      <p>otp!!</p>
      <form onSubmit={handleSubmit}>
        <input name='pin' type='password' placeholder='otp' maxLength={20} />
        <button type='submit'>submit</button>
      </form>
      {count ? <h1>2차 인증에 실패하였습니다!</h1> : null}
    </>
  );
}

interface OtpPayload {
  pin: string;
}

interface OtpResponse {
  token: string;
}

const requestOtpAuth = async (payload: OtpPayload) => {
  const cookieToken = Cookies.get('token');
  if (cookieToken === undefined) throw new Error();

  Cookies.remove('token');

  const response = await fetch(`${import.meta.env.VITE_BACKEND_EP}/login/otp`, {
    method: 'Post',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${cookieToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error();
  }

  const data: OtpResponse = await response.json();
  return data;
};
