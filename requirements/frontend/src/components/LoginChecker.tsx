import { Navigate, Route } from 'react-router-dom';

interface LoginCheckerProps {
  children: React.ReactNode;
}

export function LoginChecker({ children }: LoginCheckerProps) {
  const localToken = localStorage.getItem('token');
  return <>{localToken ? children : <Navigate to='/login' />}</>;
}
