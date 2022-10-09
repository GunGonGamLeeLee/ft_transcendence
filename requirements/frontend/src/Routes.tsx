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
import { Room } from './pages/room/Room';
import { Lobby } from './pages/lobby/Lobby';
import { Login } from './pages/login/Login';
import { RoomChecker } from './pages/channel/components/RoomChecker';
import { ErrorHandler } from './ErrorHandler';

export const Routes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={
        <Body>
          <Outlet />
        </Body>
      }
      errorElement={<ErrorHandler />}
    >
      <Route index element={<Navigate to='/login' replace={true} />} />
      <Route path='login' element={<Login />} />
      <Route element={<LoginChecker />}>
        <Route path='lobby' element={<Lobby />} />
        <Route path='channel' element={<Channel />} />
        <Route path='channel/room' element={<Room />} />
        <Route path='channel/roomChecker' element={<RoomChecker />} />
      </Route>
    </Route>,
  ),
);
