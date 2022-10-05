import jwtDecode from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from '../atoms/loginState';
import { JwtPayload } from '../pages/login/Types';

export function LoginChecker() {
  const isLoggedIn = useRecoilValue(loginState); // needed..?
  const token = localStorage.getItem('token');
  console.log('checker');
  if (isLoggedIn || (token && jwtDecode<JwtPayload>(token).qr)) {
    return <Outlet />;
  }

  return <Navigate to='login' replace={true} />;
}
