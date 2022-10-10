import * as React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { newRoomModalState } from '../../atoms/modals/newRoomModalState';
import { authState } from '../../atoms/authState';
import {
  allRoomListState,
  joinedRoomListState,
} from '../../atoms/roomListState';
import styles from './NewRoomModal.module.css';
import modalstyles from '../Modal.module.css';
import { RoomType } from '../../atoms/currRoomState';
import { RedCross } from '../buttons/RedCross';
import { userProfileState } from '../../atoms/userProfileState';

export function NewRoomModal() {
  const NewRoomModal = useRecoilValue(newRoomModalState);

  return NewRoomModal ? <NewRoom /> : null;
}

function NewRoom() {
  const userProfile = useRecoilValue(userProfileState);
  const { token } = useRecoilValue(authState);
  const setNewRoomModal = useSetRecoilState(newRoomModalState);
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [title, setTitle] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [allRoomList, setAllRoomList] = useRecoilState(allRoomListState);
  const [joinedRoomList, setJoinedRoomList] =
    useRecoilState(joinedRoomListState);

  const onClick = () => {
    setNewRoomModal(false);
  };

  const onChangeIsPrivate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(event.target.checked);
  };
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const roomTitle = title;
    const roomPassword = password;
    const mode = isPrivate
      ? 'private'
      : password !== null
      ? 'protected'
      : 'public';

    console.log(typeof roomTitle, typeof mode, typeof roomPassword);

    await requestCreateRoom(roomTitle, mode, roomPassword);
  };

  const requestCreateRoom = async (
    roomName: string,
    mode: string,
    password: string
  ) => {
    const room = {
      title: roomName,
      mode,
      password,
    };

    const response = await fetch(`${import.meta.env.VITE_BACKEND_EP}/channel`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(room),
    });

    if (response.status === 201) {
      const data: RoomType = await response.json();
      console.log(data);

      setAllRoomList([...allRoomList, data]);
      setJoinedRoomList([...joinedRoomList, data]);
      setNewRoomModal(false);
      return;
    }

    alert('Create room failed');
    setNewRoomModal(false);
  };

  return (
    <>
      <div className={modalstyles.modal}>
        <div className={modalstyles.modal__blank} onClick={onClick}></div>
        <div className={styles.new}>
          <div className={styles.new__header}>
            <span className={styles.new__headertitle}>새 채팅방</span>
            <RedCross onClick={onClick} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.new__options}>
              <div className={styles.new__option}>
                <span className={styles.new__title}>방 제목</span>
                <input
                  required
                  type='text'
                  className={styles.new__input}
                  maxLength={20}
                  placeholder={`${userProfile.displayName}님의 방`}
                  value={title}
                  onChange={onChangeTitle}
                />
              </div>
              <div className={styles.new__option}>
                <span className={styles.new__title}>초대 only</span>
                <div className={styles.new__checkboxdiv}>
                  <input
                    type='checkbox'
                    className={styles.new__checkbox}
                    checked={isPrivate}
                    onChange={onChangeIsPrivate}
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
                  value={password}
                  onChange={onChangePassword}
                />
              </div>
            </div>
            <div className={styles.new__buttons}>
              <button className={styles.new__button}>만들기</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
