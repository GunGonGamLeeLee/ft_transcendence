import { Navigate, Outlet } from 'react-router-dom';
import { useIsLoggedIn } from '../atoms/authState';

export function LoginChecker() {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to='login' replace={true} />;
}
