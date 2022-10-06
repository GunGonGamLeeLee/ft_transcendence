import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import * as React from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import { LoginButton } from './LoginButton';
import { Otp } from './Otp';

export interface JwtPayload {
  iat: number;
  id: number;
  qr: boolean;
}

export function Authenticate() {
  const setIsAuthorized = useSetRecoilState(authState);
  const { token, needMfa } = useParseCookieToken();

  React.useEffect(() => {
    if (token === null) return;
    if (needMfa === true) return;

    setIsAuthorized({ token });
  }, [token, needMfa, setIsAuthorized]);

  if (token !== null) return <Otp />;
  return <LoginButton />;
}

const useParseCookieToken = () => {
  const [token, setToken] = React.useState<string | null>(null);
  const [needMfa, setNeedMfa] = React.useState<boolean>(false);

  React.useEffect(() => {
    const CookieToken = Cookies.get('token');
    if (CookieToken === undefined) {
      if (token) {
        setToken(null);
        setNeedMfa(false);
      }

      return;
    }

    setToken(CookieToken);

    try {
      const { isRequiredTFA } = jwtDecode<JwtPayload>(CookieToken);

      if (isRequiredTFA) {
        setNeedMfa(true);
      } else {
        setToken(CookieToken);
      }
    } catch (err) {
      console.log(err);
    }
  });

  return { token, needMfa } as const;
};
