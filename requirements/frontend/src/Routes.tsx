import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
} from 'react-router-dom';
import { LoginChecker } from './components/LoginChecker';
import { Lobby } from './pages/lobby/Lobby';
import { Login } from './pages/login/Login';

export const Routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route path="login" element={<Login />} />
      <Route element={<LoginChecker />}>
        <Route path="lobby" element={<Lobby />} />
      </Route>
    </Route>,
  ),
);
