import { RecoilRoot, useRecoilState } from 'recoil';
import './App.css';
import { loginState } from './components/atoms/recoilAtoms';
import { LoginChecker } from './components/LoginChecker';

function App() {
  return (
    <RecoilRoot>
      <LoginChecker>
        <h1>After Login</h1>
      </LoginChecker>
    </RecoilRoot>
  );
}

export default App;
