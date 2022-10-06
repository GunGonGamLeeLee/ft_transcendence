import { useState } from 'react';
import styles from './UserProfile.module.css';

interface UserInterface {
  userName: string;
  userImg: string;
  userId: number;
  status: number;
}

function ProfileButton({ text }: { text: string }) {
  return <button className={styles.profile__button}>{text}</button>;
}

export default function UserProfile({
  user,
  onClick,
}: {
  user: UserInterface;
  onClick(): void;
}) {
  return (
    <>
      <div className={styles.profile__blank} onClick={onClick}></div>
      <div className={styles.profile}>
        <div className={styles.profile__header}>
          <div className={styles.profile__redcross} onClick={onClick}></div>
        </div>
        <div className={styles.profile__display}>
          <img src={user.userImg} className={styles.profile__img} />
          <div className={styles.profile__name}>{user.userName}</div>
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
    </>
  );
}
