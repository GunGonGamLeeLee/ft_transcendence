import Cookies from 'js-cookie';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';

export function Otp() {
  const setAuthState = useSetRecoilState(authState);

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
      Cookies.remove('token');
      setAuthState({ token: null });
      return;
    }
  };

  return (
    <>
      <p>otp!!</p>
      <form onSubmit={handleSubmit}>
        <input name='pin' placeholder='otp' />
        <button type='submit'>submit</button>
      </form>
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
