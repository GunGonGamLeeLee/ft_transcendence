import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userProfileModalState } from '../../atoms/modals/userProfileModalState';
import { userProfileState } from '../../atoms/userProfileState';
import styles from './MyProfile.module.css';

export function MyProfile() {
  const userProfile = useRecoilValue(userProfileState);
  const setState = useSetRecoilState(userProfileModalState);
  const onClick = () => {
    setState(userProfile);
  };
  return (
    <div className={styles.myprofile} onClick={onClick}>
      <img src={userProfile.imgUri} className={styles.myprofile__img} />
      <div className={styles.myprofile__text}>
        <p className={styles.myprofile__name}>
          {userProfile.displayName} {userProfile.id}
        </p>
        <p className={styles.myprofile__rating}>{userProfile.rating}</p>
      </div>
    </div>
  );
}
