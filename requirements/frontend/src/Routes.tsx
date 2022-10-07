import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Navigate,
} from 'react-router-dom';
import Body from './components/Body';
import { LoginChecker } from './components/LoginChecker';
import { Channel } from './pages/channel/Channel';
import { Chat } from './pages/chat/Chat';
import { Lobby } from './pages/lobby/Lobby';
import { Login } from './pages/login/Login';

export const Routes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={
        <Body>
          <Outlet />
        </Body>
      }
    >
      <Route index element={<Navigate to='/login' replace={true} />} />
      <Route path='login' element={<Login />} />
      <Route element={<LoginChecker />}>
        <Route path='lobby' element={<Lobby />} />
        <Route path='channel' element={<Channel />} />
        <Route path='channel/:id' element={<Chat />} />
      </Route>
    </Route>
  )
);
