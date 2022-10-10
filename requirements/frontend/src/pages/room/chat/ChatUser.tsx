import { UserDataType } from '../../../atoms/userDataType';
import styles from '../../../components/SideBar/UserLi.module.css';

type roleType = 'owner' | 'op' | 'user'; // todo

export interface ChatUserType extends UserDataType {
  role: roleType;
}

export function ChatUser({ user }: { user: ChatUserType }) {
  const onClick = () => {};

  return (
    <>
      <li className={`${styles.user}`} onClick={onClick}>
        <div className={styles.user_profile__div}>
          <img src={user.imgUri} className={styles.user_profile__img} />
          <div className={styles.user_profile__username}>
            {user.displayName}
          </div>
        </div>
        <div>{user.role}</div>
      </li>
    </>
  );
}
