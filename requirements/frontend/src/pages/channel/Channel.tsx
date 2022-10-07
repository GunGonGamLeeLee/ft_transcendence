import { useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import ChannelLists from './ChannelLists';

export function Channel() {
  return (
    <>
      <ChannelLists />
      <SideBar />
    </>
  );
}
