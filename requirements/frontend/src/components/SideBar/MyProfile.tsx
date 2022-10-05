import styles from './MyProfile.module.css';

interface UserInterface {
  userName: string;
  userImg: string;
  userId: number;
  status: number;
}

export default function MyProfile({ user }: { user: UserInterface }) {
  return (
    <div className={styles.myprofile}>
      <img src={user.userImg} className={styles.myprofile__img} />
      <div className={styles.myprofile__text}>
        <p className={styles.myprofile__name}>{user.userName}</p>
        <p className={styles.myprofile__rating}>rating : 1697</p>
      </div>
    </div>
  );
}
