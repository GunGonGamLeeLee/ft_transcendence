import { useRecoilValue } from 'recoil';
import { userProfileState } from '../../atoms/userProfileState';
import styles from './MyProfile.module.css';

export function MyProfile() {
  const userProfile = useRecoilValue(userProfileState);

  return (
    <div className={styles.myprofile}>
      <img src={userProfile.imgUri} className={styles.myprofile__img} />
      <div className={styles.myprofile__text}>
        <p className={styles.myprofile__name}>{userProfile.displayName}</p>
        <p className={styles.myprofile__rating}>{userProfile.rating}</p>
      </div>
    </div>
  );
}
