import SideBar from '../../components/SideBar/SideBar';
import { LoginChecker } from '../../components/LoginChecker';
import Body from '../../components/Body';
import ChannelList from './ChannelList';

export function Channel() {
  return (
    <>
      <LoginChecker>
        <Body>
          <ChannelList />
          <SideBar />
        </Body>
      </LoginChecker>
    </>
  );
}
