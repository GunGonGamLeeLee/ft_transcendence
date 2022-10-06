import { useRecoilValue } from 'recoil';
import { friendListState } from '../../atoms/friendListState';
import UserLi from './UserLi';

export function FriendList() {
  const friendList = useRecoilValue(friendListState);

  return (
    <>
      {friendList.map((user, index) => (
        <UserLi user={user} key={index} isRank={false} />
      ))}
    </>
  );
}
