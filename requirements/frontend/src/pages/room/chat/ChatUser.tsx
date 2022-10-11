import { useSetRecoilState } from 'recoil';
import { ChatUserType } from '../../../atoms/chatUserType';
import { chatProfileModalState } from '../../../atoms/modals/chatProfileModalState';
import styles from '../../../components/SideBar/UserLi.module.css';

export function ChatUser({ user }: { user: ChatUserType }) {
  const setChatProfile = useSetRecoilState(chatProfileModalState);
  const onClick = () => {
    setChatProfile(user);
  };

  return (
    <li className={`${styles.user}`} onClick={onClick}>
      <div className={styles.user_profile__div}>
        <img src={user.imgUri} className={styles.user_profile__img} />
        <div className={styles.user_profile__username}>{user.displayName}</div>
      </div>
      <div>{user.role}</div>
    </li>
  );
}
