import { useRecoilState } from 'recoil';
import { Cookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import {
  userDisplayNameState,
  userProfileImgState,
} from '../../atoms/userState';
import Body from '../../components/Body';

function LogginButton() {
  return (
    <>
      <a href={`${import.meta.env.VITE_BACKEND_EP}/login/oauth`}>
        <button>login</button>
      </a>
    </>
  );
}

function OTP() {
  return (
    <>
      <p>otp!!</p>
      <form>
        <input placeholder='otp' />
        <button>submit</button>
      </form>
    </>
  );
}

interface jwt_payload {
  iat: number;
  id: number;
  qr: boolean;
}

export function Login() {
  const [userDisplayName, setUserDisplayName] =
    useRecoilState(userDisplayNameState);
  const [userProfileImg, setUserProfileImg] =
    useRecoilState(userProfileImgState);

  const cookies = new Cookies();
  const token = cookies.get('token');
  console.log(token);
  if (token) {
    localStorage.setItem('token', token);
  }
  const localToken: string | null = localStorage.getItem('token');

  if (localToken) {
    // if localToken exists
    const jwt_decoded: jwt_payload = jwtDecode<jwt_payload>(localToken);
    console.log(jwt_decoded.qr);
    if (jwt_decoded.qr) {
      // if need otp
      return (
        <Body>
          <OTP />
        </Body>
      );
    } else {
      // if log-in done
      // To-Do : get ProfileImg & DisplayName
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
