import SideBar from '../../components/SideBar';
import Menu from './Menu';
import { LoginChecker } from '../../components/LoginChecker';
import Body from '../../components/Body';

export function Lobby() {
  return (
    <>
      <LoginChecker>
        <Body>
          <Menu />
          <SideBar />
        </Body>
      </LoginChecker>
    </>
  );
}
