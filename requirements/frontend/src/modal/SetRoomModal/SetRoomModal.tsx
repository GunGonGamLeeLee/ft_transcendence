import { ChangeEvent, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { setRoomModalState } from '../../atoms/modals/setRoomModalState';
import styles from './setRoomModal.module.css';
import modalstyles from '../Modal.module.css';
import { RedCross } from '../buttons/RedCross';
import { currRoomState } from '../../atoms/currRoomState';
import { userProfileState } from '../../atoms/userProfileState';

export default function SetRoom() {
  const setsetRoomModal = useSetRecoilState(setRoomModalState);
  const currRoom = useRecoilValue(currRoomState);
  const [isPrivate, setIsPrivate] = useState(currRoom?.private);
  const [title, setTitle] = useState(currRoom?.title);
  const [password, setPassword] = useState<string>('');

  const onClick = () => {
    setsetRoomModal(false);
  };

  const onChangeIsPrivate = (event: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(event.target.checked);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      {currRoom === null ? (
        <></>
      ) : (
        <div className={modalstyles.modal}>
          <div className={modalstyles.modal__blank} onClick={onClick}></div>
          <div className={styles.set}>
            <div className={styles.set__header}>
              <span className={styles.set__headertitle}>새 채팅방</span>
              <RedCross onClick={onClick} />
            </div>
            <div className={styles.set__options}>
              <div className={styles.set__option}>
                <span className={styles.set__title}>방 제목</span>
                <input
                  required
                  type='text'
                  className={styles.set__input}
                  maxLength={20}
                  placeholder={`${currRoom.ownerName}님의 방`}
                  value={title}
                  onChange={onChangeTitle}
                />
              </div>
              <div className={styles.set__option}>
                <span className={styles.set__title}>초대 only</span>
                <div className={styles.set__checkboxdiv}>
                  <input
                    type='checkbox'
                    className={styles.set__checkbox}
                    checked={isPrivate}
                    onChange={onChangeIsPrivate}
                  />
                </div>
              </div>
              <div
                className={`${styles.set__option} ${
                  isPrivate ? styles.set__inactive : ''
                }`}
              >
                <span className={styles.set__title}>비밀번호</span>
                <input
                  type='password'
                  className={styles.set__input}
                  maxLength={10}
                  placeholder='비밀번호'
                  value={password}
                  onChange={onChangePassword}
                />
              </div>
            </div>
            <div className={styles.set__buttons}>
              <button className={styles.set__button}>만둘깅</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function SetRoomModal() {
  const setRoomModal = useRecoilValue(setRoomModalState);

  return <>{setRoomModal === false ? <></> : <SetRoom />}</>;
}
