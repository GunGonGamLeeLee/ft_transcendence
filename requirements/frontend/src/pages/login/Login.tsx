import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../../atoms/authState';
import { Authenticate } from './Authenticate';

export function Login() {
  const { token } = useRecoilValue(authState);

  if (token !== null) {
    return <Navigate to='/lobby' />;
  }

  return <Authenticate />;
}
