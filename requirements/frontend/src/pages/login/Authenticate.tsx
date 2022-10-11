import * as React from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import { LoginButton } from './LoginButton';
import { Otp } from './Otp';

export interface JwtPayload {
  id: number;
  isRequiredTFA: boolean;
}

export function Authenticate() {
  const setAuthState = useSetRecoilState(authState);
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const cookieToken = Cookies.get('token');
    if (cookieToken === undefined) {
      setToken(null);
      return;
    }

    const mfaNeed = jwtDecode<JwtPayload>(cookieToken).isRequiredTFA;
    if (!mfaNeed) {
      setAuthState({ token: cookieToken });
      return;
    }

    setToken(cookieToken);
  }, [setAuthState]);

  if (token !== null) return <Otp />;
  return <LoginButton />;
}
