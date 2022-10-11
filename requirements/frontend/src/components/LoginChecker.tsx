import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../atoms/authState';

export function LoginChecker() {
  const { token } = useRecoilValue(authState);

  if (token !== null) {
    return <Outlet />;
  }

  return <Navigate to='login' replace={true} />;
}
