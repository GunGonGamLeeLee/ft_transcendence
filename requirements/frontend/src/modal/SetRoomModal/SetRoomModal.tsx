import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { setRoomModalState } from '../../atoms/modals/setRoomModalState';
import styles from './SetRoomModal.module.css';
import modalstyles from '../Modal.module.css';
import { RedCross } from '../buttons/RedCross';
import {
  currRoomState,
  RoomModeType,
  RoomType,
} from '../../atoms/currRoomState';
import { authState } from '../../atoms/authState';
import { getChId } from '../../utils/getChId';
import { socket } from '../../components/Socket/SocketChecker';

export default function SetRoom() {
  const setsetRoomModal = useSetRecoilState(setRoomModalState);
  const [currRoom, setCurrRoom] = useRecoilState(currRoomState);
  const [isPrivate, setIsPrivate] = useState(
    currRoom?.mode === RoomModeType.PRIVATE,
  );
  const [title, setTitle] = useState(currRoom?.title);
  const [password, setPassword] = useState<string>('');
  const { token } = useRecoilValue(authState);

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

  const handleChangeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    socket.emit('chat/updateChannel', {
      chid: getChId(currRoom?.roomId),
      chName: title,
      mode:
        isPrivate === true
          ? RoomModeType.PRIVATE
          : password.length === 0
          ? RoomModeType.PUBLIC
          : RoomModeType.PROTECTED,
      password: password,
    });

    setsetRoomModal(false);
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
              <span className={styles.set__headertitle}>SETTING</span>
              <RedCross onClick={onClick} />
            </div>
            <div className={styles.set__main}>
              <div>
                <div className={styles.set__options}>
                  <div className={styles.set__option}>
                    <span className={styles.set__title}>??? ??????</span>
                    <input
                      required
                      type='text'
                      autoComplete='off'
                      className={styles.set__input}
                      maxLength={20}
                      placeholder={`${currRoom.ownerDisplayName}?????? ???`}
                      value={title}
                      onChange={onChangeTitle}
                    />
                  </div>
                  <div className={styles.set__option}>
                    <span className={styles.set__title}>?????? only</span>
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
                    <span className={styles.set__title}>????????????</span>
                    <input
                      type='password'
                      className={styles.set__input}
                      maxLength={4}
                      placeholder='????????????'
                      value={password}
                      onChange={onChangePassword}
                    />
                  </div>
                </div>
                <div className={modalstyles.modal__buttons}>
                  <button
                    className={modalstyles.modal__button}
                    onClick={handleChangeClick}
                  >
                    CHANGE
                  </button>
                </div>
              </div>
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
