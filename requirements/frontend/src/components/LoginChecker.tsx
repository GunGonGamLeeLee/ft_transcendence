import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Login } from './pages/login/Login';
import { loginState } from './atoms/recoilAtoms';
import jwt_decode from 'jwt-decode';

interface LoginCheckerProps {
  children: React.ReactNode;
}

interface TokenData {
  // ?
  id: number;
}

export function LoginChecker({ children }: LoginCheckerProps) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  const localToken = localStorage.getItem('token');

  const authorizeToken = async () => {
    return await fetch(`http://localhost:8000/profile`, {
      headers: {
        Authorization: `Bearer ${localToken}`,
      },
    });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('not logged in');
      if (localToken) {
        console.log('has local token');
        setIsLoggedIn(true);
      }
    } else {
      console.log('validate');
      // const response = authorizeToken();
      // response.then((res) => {
      //   if (!res.ok) {
      //     localStorage.removeItem('token');
      //     setIsLoggedIn(false);
      //   }
      // });
    }
  });

  return <>{isLoggedIn ? children : <Login />}</>;
}
