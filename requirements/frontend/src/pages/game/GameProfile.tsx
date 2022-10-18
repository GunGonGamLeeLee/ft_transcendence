import { useRecoilValue } from 'recoil';
import { userProfileState } from '../../atoms/userProfileState';
import styles from './Game.module.css';
import { SmallProfileType } from './game.room.dto';

export function DefaultProfile() {
  const userProfile = useRecoilValue(userProfileState);
  return (
    <div className={styles.game_profile_div}>
      <div className={styles.game_profile}>
        <div className={styles.game_profile__header}>PLAYER</div>
        <div className={styles.game_profile__img_div}>
          <img src={userProfile.imgUri} className={styles.game_profile__img} />
        </div>
        <div className={styles.game_profile__name}>
          {userProfile.displayName}
        </div>
        <div className={styles.game_profile__rating}>{userProfile.rating}</div>
      </div>
    </div>
  );
}

export function DefaultProfile2() {
  return (
    <div className={styles.game_profile_div}>
      <div className={styles.game_profile}>
        <div className={styles.game_profile__header}>PLAYER</div>
        <div className={styles.game_profile__img_div}>
          <div className={styles.game_profile__img_default}>?</div>
        </div>
        <div className={styles.game_profile__name}>LOADING...</div>
        <div className={styles.game_profile__rating}>LOADING...</div>
      </div>
    </div>
  );
}

export function GameProfile({ profile }: { profile: SmallProfileType }) {
  return (
    <div className={styles.game_profile_div}>
      <div className={styles.game_profile}>
        <div className={styles.game_profile__header}>PLAYER</div>
        <div className={styles.game_profile__img_div}>
          <img src={profile.imgUri} className={styles.game_profile__img} />
        </div>
        <div className={styles.game_profile__name}>{profile.displayName}</div>
        <div className={styles.game_profile__rating}>{profile.rating}</div>
      </div>
    </div>
  );
}
