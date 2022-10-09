import { ChangeEvent, useState } from 'react';
import styles from './NewRoom.module.css';

export default function NewRoom({ onClick }: { onClick(): void }) {
  const [isPrivate, setIsPrivate] = useState(false);

  const onChangePrivate = (event: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(event.target.checked);
  };

  return (
    <>
      <div className={styles.new__blank} onClick={onClick}></div>
      <div className={styles.new}>
        <div className={styles.new__header}>
          <span className={styles.new__headertitle}>새 채팅방</span>
          <div className={styles.new__redcross} onClick={onClick}></div>
        </div>
        <div className={styles.new__options}>
          <div className={styles.new__option}>
            <span className={styles.new__title}>방 제목</span>
            <input
              required
              type='text'
              className={styles.new__input}
              maxLength={20}
              placeholder='jeongble님의 방'
            />
          </div>
          <div className={styles.new__option}>
            <span className={styles.new__title}>초대 only</span>
            <div className={styles.new__checkboxdiv}>
              <input
                type='checkbox'
                className={styles.new__checkbox}
                onChange={onChangePrivate}
              />
            </div>
          </div>
          <div
            className={`${styles.new__option} ${
              isPrivate ? styles.new__inactive : ''
            }`}
          >
            <span className={styles.new__title}>비밀번호</span>
            <input
              type='password'
              className={styles.new__input}
              maxLength={10}
              placeholder='비밀번호'
            />
          </div>
        </div>
        <div className={styles.new__buttons}>
          <button className={styles.new__button}>만둘깅</button>
        </div>
      </div>
    </>
  );
}