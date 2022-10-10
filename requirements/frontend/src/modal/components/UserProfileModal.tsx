import { useRecoilValue, useSetRecoilState } from 'recoil';
import { UserDataType } from '../../atoms/userDataType';
import { userProfileModalState } from '../../atoms/modals/userProfileModalState';
import styles from './UserProfileModal.module.css';
import modalstyles from './Modal.module.css';

function ProfileButton({ text }: { text: string }) {
  return <button className={styles.profile__button}>{text}</button>;
}

function UserProfile({ id }: { id: number }) {
  const setState = useSetRecoilState(userProfileModalState);
  const onClick = () => {
    setState(undefined);
  };

  // fetch and set user
  return (
    <>
      <div className={modalstyles.modal}>
        <div className={styles.profile__blank} onClick={onClick}></div>
        <div className={styles.profile}>
          <div className={styles.profile__header}>
            <div className={styles.profile__redcross} onClick={onClick}></div>
          </div>
          <div className={styles.profile__display}>
            <img className={styles.profile__img} />
            <div className={styles.profile__name}>unknown</div>
            {/* <img src={user.imgUri} className={styles.profile__img} />
          <div className={styles.profile__name}>{user.displayName}</div> */}
          </div>
          <div className={styles.profile__stat}>매칭 기록이 없습니다.</div>
          <div className={styles.profile__buttons}>
            <ProfileButton text='친추/삭' />
            <ProfileButton text='차단' />
          </div>
          <div className={styles.profile__buttons}>
            <ProfileButton text='대전' />
            <ProfileButton text='DM' />
          </div>
        </div>
      </div>
    </>
  );
}

export function UserProfileModal() {
  const userProfileModal = useRecoilValue(userProfileModalState);

  return (
    <>
      {userProfileModal === undefined ? (
        <></>
      ) : (
        <UserProfile id={userProfileModal} />
      )}
    </>
  );
}
