import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { authState } from './atoms/authState';

export function ErrorHandler() {
  const resetAuth = useResetRecoilState(authState);
  const navigator = useNavigate();

  React.useEffect(() => {
    resetAuth();
    navigator('/');
  }, []);

  return <h1>Error!</h1>;
}
