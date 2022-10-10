import { SideBar } from '../../components/SideBar/SideBar';
import { Modal } from '../../modal/Modal';
import Menu from './Menu';

export function Lobby() {
  return (
    <>
      <Modal />
      <Menu />
      <SideBar />
    </>
  );
}
