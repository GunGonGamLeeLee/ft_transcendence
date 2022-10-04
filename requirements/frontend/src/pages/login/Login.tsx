import { useRecoilState } from 'recoil';
import { loginState } from '../../atoms/loginState';

export function Login() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  return (
    <a href={`${import.meta.env.VITE_BACKEND_EP}/oauth`}>
      <button>login</button>
    </a>
  );
}
