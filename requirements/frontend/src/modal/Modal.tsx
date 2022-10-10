import { useRecoilValue } from 'recoil';
import { userProfileModalState } from '../atoms/userProfileModalState';
import { UserProfile } from './components/UserProfileModal';

export function Modal() {
  const userProfileModal = useRecoilValue(userProfileModalState);

  return (
    <>
      {userProfileModal === undefined ? (
        <></>
      ) : (
        <UserProfile id={userProfileModal} />
      )}
    </>
  );
}
