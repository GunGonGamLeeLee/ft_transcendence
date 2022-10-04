import { useRecoilState } from 'recoil';
import { loginState } from '../../atoms/loginState';

export function Login() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  const onClick = () => {
    setIsLoggedIn(true);
    localStorage.setItem('token', 'ZXCv');
  };

  return (
    // <a href="http://localhost:8000/test">
    <button onClick={onClick}>login</button>
    // </a>
  );
}
