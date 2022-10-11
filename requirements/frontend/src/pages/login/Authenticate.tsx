import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import * as React from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import { LoginButton } from './LoginButton';
import { Otp } from './Otp';

export interface JwtPayload {
  id: number;
  isRequiredTFA: boolean;
}

export function Authenticate() {
  const setIsAuthorized = useSetRecoilState(authState);
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const cookieToken = Cookies.get('token');
    if (cookieToken === undefined) {
      setToken(null);
      return;
    }

    const mfaNeed = jwtDecode<JwtPayload>(cookieToken).isRequiredTFA;
    if (!mfaNeed) setIsAuthorized({ token: cookieToken });
    setToken(cookieToken);
  }, []);

  if (token !== null) return <Otp />;
  return <LoginButton />;
}
