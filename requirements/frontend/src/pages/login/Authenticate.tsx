import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import { LoginButton } from './LoginButton';
import { Otp } from './Otp';
import { JwtPayload } from './types';

export function Authenticate() {
  const [isAuthorized, setIsAuthorized] = useRecoilState(authState);
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
    if (CookieToken === undefined) return;

    setToken(CookieToken);

    try {
      const { qr } = jwtDecode<JwtPayload>(CookieToken);
      if (qr) {
        setToken(CookieToken);
      } else {
        setNeedMfa(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return { token, needMfa } as const;
};
