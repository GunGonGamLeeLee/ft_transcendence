import { RecoilRoot } from 'recoil';
import './App.css';
import { LoginChecker } from './components/LoginChecker';
import { Lobby } from './pages/lobby/Lobby';

function App() {
  return (
    <RecoilRoot>
      <LoginChecker>
        <Lobby />
      </LoginChecker>
    </RecoilRoot>
  );
}

export default App;
