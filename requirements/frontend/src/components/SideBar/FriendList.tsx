import { useRecoilValue } from 'recoil';
import { friendListState } from '../../atoms/friendListState';
import { UserDataType } from '../../atoms/userDataType';
import styles from './UserList.module.css';
import { useSetRecoilState } from 'recoil';
import { userProfileModalState } from '../../atoms/modals/userProfileModalState';

export function FriendList() {
  const friendList = useRecoilValue(friendListState);

  return (
    <>
      {friendList.map((user) => (
        <Friend user={user} key={user.uid} />
      ))}
    </>
  );
}

function Friend({ user }: { user: UserDataType }) {
  const setUserProfile = useSetRecoilState(userProfileModalState);

  const onClick = () => {
    setUserProfile(user);
  };

  return (
    <li className={styles.user} onClick={onClick}>
      <div className={styles.user_profile__div}>
        <img src={user.imgUri} className={styles.user_profile__img} />
        <div className={styles.user_profile__username}>{user.displayName}</div>
      </div>
      <div className={styles.user_state__div}>{user.status}</div>
    </li>
  );
}
