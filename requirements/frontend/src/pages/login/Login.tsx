import jwtDecode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import Body from '../../components/Body';
import Otp from './Otp';
import LogginButton from './LoginButton';
import { JwtPayload } from './Types';
import Cookies from 'js-cookie';

export function Login() {
  // const [isLoggedIn, setLoginState] = useRecoilState(loginState); // needed?

  // if (isLoggedIn) {
  //   return <Navigate to='/lobby' />;
  // }
  console.log('login');
  const cookieToken = Cookies.get('token');
  const localToken = localStorage.getItem('token');

  const token = localToken || cookieToken;

  if (token) {
    if (!localToken && cookieToken) {
      localStorage.setItem('token', cookieToken);
      Cookies.remove('token');
    }
    // if localToken exists
    const jwtDecoded = jwtDecode<JwtPayload>(token);

    if (!jwtDecoded.qr) {
      // if need otp
      return (
        <Body>
          <Otp />
        </Body>
      );
    } else {
      // if log-in done
      // To-Do : get ProfileImg & DisplayName
      // setLoginState(true); // ..?
      return <Navigate to='/lobby' />;
    }
  } else {
    // if localToken doesn't exist
    return (
      <Body>
        <LogginButton />
      </Body>
    );
  }
}
