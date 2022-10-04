import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from '../atoms/loginState';
import { userDisplayNameState, userProfileImgState } from '../atoms/userState';
import { Login } from '../pages/login/Login';

interface LoginCheckerProps {
  children: React.ReactNode;
}

export function LoginChecker({ children }: LoginCheckerProps) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userDisplayName, setUserDisplayName] =
    useRecoilState(userDisplayNameState);
  const [userProfileImg, setUserProfileImg] =
    useRecoilState(userProfileImgState);

  const localToken = localStorage.getItem('token');

  const authorizeToken = async () => {
    return await fetch(`${import.meta.env.VITE_BACKEND_EP}/profile`, {
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
      //   } else {
      //
      //   }
      // });
    }
  });

  useEffect(() => {
    if (isLoggedIn) {
    }
  }, [isLoggedIn]);

  return <>{isLoggedIn ? children : <Login />}</>;
}
