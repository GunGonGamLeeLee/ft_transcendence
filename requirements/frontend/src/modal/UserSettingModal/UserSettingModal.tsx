import React, { ChangeEvent, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userSettingModalState } from '../../atoms/modals/userSettingModalState';
import styles from './UserSettingModal.module.css';
import modalstyles from '../Modal.module.css';
import { userProfileState } from '../../atoms/userProfileState';

export default function UserSetting() {
  const setUserSettingModal = useSetRecoilState(userSettingModalState);
  const userProfile = useRecoilValue(userProfileState);
  const [previewImg, setPreviewImg] = useState<string>(userProfile.imgUri);
  const [displayName, setDisplayName] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onClick = () => {
    setUserSettingModal(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: FileList | null = event.target.files;
    if (file && file[0]) {
      setPreviewImg(URL.createObjectURL(file[0]));
    } else {
      setPreviewImg(userProfile.imgUri);
    }
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(event.target.value);
  };

  const onChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <div className={modalstyles.modal}>
        <div className={modalstyles.modal__blank} onClick={onClick}></div>
        <div className={styles.setting}>
          <div className={styles.setting__header}>
            <span className={styles.setting__headertitle}>프로필 수정</span>
            <div className={styles.setting__redcross} onClick={onClick}></div>
          </div>
          <div className={styles.setting__img}>
            <img src={previewImg} className={styles.setting__preview} />
            <input type='file' accept='image/*' onChange={onChange} />
          </div>
          <div className={styles.setting__displayname}>
            <input
              type='text'
              placeholder='displayname'
              value={displayName}
              onChange={onChangeName}
              className={styles.setting__displayname_input}
            />
            <button className={styles.setting__displayname_button}>
              중복확인
            </button>
          </div>
          <div className={styles.setting__displayname_warning}>중복 ㅋ</div>
          <div className={styles.setting__2FA}>
            <div>2차인증</div>
            <input
              type='checkbox'
              checked={isChecked}
              onChange={onChangeChecked}
              className={styles.setting__2FA_checkbox}
            />
          </div>
          <div className={styles.setting__buttons}>
            <button className={styles.setting__apply}>적용하기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export function UserSettingModal() {
  const userSetting = useRecoilValue(userSettingModalState);

  return <>{userSetting === false ? <></> : <UserSetting />}</>;
}
