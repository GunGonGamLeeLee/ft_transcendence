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
import { Modal } from './modal/Modal';
import { SocketChecker } from './components/Socket/SocketChecker';

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
      <Route
        index
        element={<Navigate to='/login' replace={true} />}
        errorElement={<ErrorHandler />}
      />
      <Route path='login' element={<Login />} errorElement={<ErrorHandler />} />
      <Route element={<LoginChecker />} errorElement={<ErrorHandler />}>
        <Route element={<SocketChecker />} errorElement={<ErrorHandler />}>
          <Route element={<Modal />} errorElement={<ErrorHandler />}>
            <Route
              path='lobby'
              element={<Lobby />}
              errorElement={<ErrorHandler />}
            />
            <Route
              path='channel'
              element={<Channel />}
              errorElement={<ErrorHandler />}
            />
            <Route
              path='channel/room'
              element={<Room />}
              errorElement={<ErrorHandler />}
            />
            <Route
              path='channel/roomChecker'
              element={<RoomChecker />}
              errorElement={<ErrorHandler />}
            />
          </Route>
        </Route>
      </Route>
    </Route>,
  ),
);
