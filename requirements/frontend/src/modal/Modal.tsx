import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userProfileModalState } from '../atoms/modals/userProfileModalState';
import { NewRoomModal } from './components/NewRoomModal';
import { UserProfileModal } from './components/UserProfileModal';

export function Modal() {
  const userProfileModal = useRecoilValue(userProfileModalState);

  return (
    <>
      <UserProfileModal />
      <NewRoomModal />
      <Outlet />
    </>
  );
}
