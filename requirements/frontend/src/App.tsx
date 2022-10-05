import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import { Lobby } from './pages/lobby/Lobby';
import { Login } from './pages/login/Login';
import { Channel } from './pages/channel/Channel';
import { Navigate } from 'react-router-dom';
// import Channel from './pages/channel/channel';

function Root() {
  const localToken = localStorage.getItem('token');
  return (
    <>{localToken ? <Navigate to='/lobby' /> : <Navigate to='/login' />}</>
  );
}

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' element={<Login />} />
          <Route path='/lobby' element={<Lobby />} />
          <Route path='/channel' element={<Channel />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
