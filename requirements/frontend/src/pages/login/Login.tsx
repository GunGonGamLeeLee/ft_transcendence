import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useIsLoggedIn } from '../../atoms/authState';
import { Authenticate } from './Authenticate';

export function Login() {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    return <Navigate to='/lobby' />;
  }

  return <Authenticate />;
}
