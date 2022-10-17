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
import { RoomModeType, RoomType } from '../../atoms/currRoomState';
import { RedCross } from '../buttons/RedCross';
import { userProfileState } from '../../atoms/userProfileState';
import { sortRoomByTitle } from '../../utils/sortRoomByTitle';
import { useFetch } from '../../hooks/useFetch';
import { refreshChannelListState } from '../../atoms/refreshChannelListState';

export function NewRoomModal() {
  const NewRoomModal = useRecoilValue(newRoomModalState);

  return NewRoomModal ? <NewRoom /> : null;
}

function NewRoom() {
  const { token } = useRecoilValue(authState);
  const userProfile = useRecoilValue(userProfileState);
  const setNewRoomModal = useSetRecoilState(newRoomModalState);
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [title, setTitle] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [allRoomList, setAllRoomList] = useRecoilState(allRoomListState);
  const [joinedRoomList, setJoinedRoomList] =
    useRecoilState(joinedRoomListState);
  const fetcher = useFetch();
  const setRefreshChannelList = useSetRecoilState(refreshChannelListState);
  if (token === null) throw new Error();

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
      ? RoomModeType.PRIVATE
      : password !== ''
      ? RoomModeType.PROTECTED
      : RoomModeType.PUBLIC;

    await requestCreateRoom(roomTitle, mode, roomPassword);
  };

  const requestCreateRoom = async (
    roomName: string,
    mode: RoomModeType,
    password: string,
  ) => {
    const room = {
      title: roomName,
      mode,
      password,
    };

    if (password.length !== 4 && password.length !== 0) {
      alert('비밀번호는 4자리어야 합니다!');
      return;
    }

    try {
      const data: RoomType = await fetcher(
        token,
        'POST',
        'chat/channel',
        room,
        true,
      );
      if (data.mode !== RoomModeType.PRIVATE)
        setAllRoomList([...allRoomList, data].sort(sortRoomByTitle));
      setJoinedRoomList([...joinedRoomList, data].sort(sortRoomByTitle));
      setRefreshChannelList(true);
    } catch (err) {
      alert('방 생성 실패');
    } finally {
      setNewRoomModal(false);
    }
  };

  return (
    <>
      <div className={modalstyles.modal}>
        <div className={modalstyles.modal__blank} onClick={onClick}></div>
        <div className={styles.new}>
          <div className={styles.new__header}>
            <span className={styles.new__headertitle}>NEW ROOM</span>
            <RedCross onClick={onClick} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.new__options}>
              <div className={styles.new__option}>
                <span className={styles.new__title}>TITLE</span>
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
                <span className={styles.new__title}>PRIVATE</span>
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
                <span className={styles.new__title}>PASSWORD</span>
                <input
                  type='password'
                  className={styles.new__input}
                  maxLength={10}
                  placeholder='PASSWORD'
                  value={password}
                  onChange={onChangePassword}
                />
              </div>
            </div>
            <div className={styles.new__buttons}>
              <button className={styles.new__button}>CREATE</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
