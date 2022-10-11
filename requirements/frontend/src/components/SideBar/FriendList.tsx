import { useRecoilValue } from 'recoil';
import { friendListState } from '../../atoms/friendListState';
import { UserDataType } from '../../atoms/userDataType';
import styles from './UserLi.module.css';
import { useSetRecoilState } from 'recoil';
import { userProfileModalState } from '../../atoms/modals/userProfileModalState';

export function FriendList() {
  const friendList = useRecoilValue(friendListState);

  return (
    <>
      {friendList.map((user) => (
        <Friend user={user} key={user.id} />
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
      <div>{user.status}</div>
    </li>
  );
}
