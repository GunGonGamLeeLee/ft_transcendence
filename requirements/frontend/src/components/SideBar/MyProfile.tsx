import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import { userProfileModalState } from '../../atoms/modals/userProfileModalState';
import { userSettingModalState } from '../../atoms/modals/userSettingModalState';
import { userProfileState } from '../../atoms/userProfileState';
import styles from './MyProfile.module.css';

export function MyProfile() {
  const userProfile = useRecoilValue(userProfileState);
  const setState = useSetRecoilState(userProfileModalState);
  const setSettingState = useSetRecoilState(userSettingModalState);
  const resetAuth = useResetRecoilState(authState);
  const navigator = useNavigate();

  const openProfile = () => {
    setState(userProfile);
  };

  const openSetting = () => {
    setSettingState(true);
  };

  const logout = () => {
    resetAuth();
    navigator('/', { replace: true });
  };

  return (
    <div className={styles.myprofile}>
      <div className={styles.myprofile__profile} onClick={openProfile}>
        <img src={userProfile.imgUri} className={styles.myprofile__img} />
        <div className={styles.myprofile__text}>
          <p className={styles.myprofile__name}>{userProfile.displayName}</p>
          <p className={styles.myprofile__rating}>{userProfile.rating}</p>
        </div>
      </div>
      <div className={styles.myprofile__icons}>
        <abbr title='프로필 설정'>
          <img
            src='/settings.png'
            className={styles.myprofile__icon}
            onClick={openSetting}
          />
        </abbr>
        <abbr title='로그아웃'>
          <img
            src='/log-out.png'
            className={styles.myprofile__icon}
            onClick={logout}
          />
        </abbr>
      </div>
    </div>
  );
}
