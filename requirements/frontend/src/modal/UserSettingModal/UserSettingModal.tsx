import * as React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userSettingModalState } from '../../atoms/modals/userSettingModalState';
import styles from './UserSettingModal.module.css';
import modalstyles from '../Modal.module.css';
import { userProfileState } from '../../atoms/userProfileState';
import { RedCross } from '../buttons/RedCross';
import { authState } from '../../atoms/authState';

export function UserSettingModal() {
  const userSetting = useRecoilValue(userSettingModalState);

  return userSetting === false ? null : <UserSetting />;
}

function UserSetting() {
  const setUserSettingModal = useSetRecoilState(userSettingModalState);
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const [previewImg, setPreviewImg] = React.useState<string>(
    userProfile.imgUri,
  );
  const [displayName, setDisplayName] = React.useState<string>('');
  const [isChecked, setIsChecked] = React.useState<boolean>(
    userProfile.mfaNeed,
  );
  const [dupCheckStatus, setDupCheckStatus] = React.useState<string>('');
  const [qrcode, setQrcode] = React.useState<string>('');
  const [qrCheckStatus, setQrCheckStatus] = React.useState<string>('');
  const [qrPin, setQrPin] = React.useState<string>('');
  const { token } = useRecoilValue(authState);
  if (token === null) throw new Error();

  const onClick = () => {
    setUserSettingModal(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null = event.target.files;

    if (fileList === null || fileList.length === 0) {
      setPreviewImg(userProfile.imgUri);
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') setPreviewImg(reader.result);
      else setPreviewImg(userProfile.imgUri);
    };

    reader.readAsDataURL(fileList[0]);
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(event.target.value);
    setDupCheckStatus('');
  };

  const onChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (userProfile.mfaNeed && isChecked && qrCheckStatus !== 'qr확인완료') {
      setQrCheckStatus('qr 인증 해주세요!');
      return;
    }

    setIsChecked(event.target.checked);
  };

  const handleDupCheckClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    if (displayName.length < 3) {
      setDupCheckStatus('이름의 길이는 세글자 이상이어야 합니다');
      return;
    }

    if (displayName.length > 8) {
      setDupCheckStatus('이름의 길이는 8글자를 초과하면 안됩니다');
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_EP}/users/namecheck`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ displayName }),
      },
    );

    if (response.status === 201) {
      setDupCheckStatus('중복확인완료');
      return;
    } else {
      setDupCheckStatus('중복된 이름입니다');
      setDisplayName('');
    }
  };

  const onSubmitClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (displayName.length > 0 && dupCheckStatus !== '중복확인완료') {
      setDupCheckStatus('중복확인 해주세요!');
      return;
    }

    if (!userProfile.mfaNeed && isChecked && qrCheckStatus !== 'qr확인완료') {
      setQrCheckStatus('qr 인증 해주세요!');
      return;
    }

    const newInfo = {
      imgData: previewImg === userProfile.imgUri ? '' : previewImg,
      displayName: displayName,
      mfaNeed: isChecked === true,
    };

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_EP}/users/me`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInfo),
      },
    );

    if (response.status === 201) {
      const newUserProfile = await response.json();
      setUserProfile(newUserProfile);
    } else {
      alert('User profile set failed');
    }

    setUserSettingModal(false);
  };

  const requestQr = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_EP}/login/qr`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.text();
    setQrcode(data);
  };

  const handlePinCheckClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_EP}/login/otp`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin: qrPin }),
      },
    );

    if (response.status === 201) {
      setQrCheckStatus('qr확인완료');
      return;
    }

    setQrCheckStatus('pin이 잘못됨');
    setQrPin('');
  };

  const handleQrPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setQrPin(e.target.value);
  };

  React.useEffect(() => {
    if (isChecked) requestQr();
  }, [isChecked]);

  return (
    <>
      <div className={modalstyles.modal}>
        <div className={modalstyles.modal__blank} onClick={onClick}></div>
        <div className={styles.setting}>
          <div className={modalstyles.modal__header}>
            <span className={modalstyles.modal__headertitle}>SETTING</span>
            <RedCross onClick={onClick} />
          </div>
          <div className={styles.setting__img}>
            <img src={previewImg} className={styles.setting__preview} />
            <label htmlFor='input-img' className={styles.setting__img_label}>
              UPLOAD IMAGE
            </label>
            <input
              id='input-img'
              type='file'
              accept='image/*'
              onChange={onChange}
              className={styles.setting__img_input}
            />
          </div>
          <div className={styles.setting__options}>
            <div className={styles.setting__title}>NAME</div>
            <div>
              <input
                type='text'
                autoComplete='off'
                placeholder={userProfile.displayName}
                value={displayName}
                maxLength={8}
                onChange={onChangeName}
                className={styles.setting__displayname_input}
              />
              <button
                className={styles.setting__displayname_button}
                onClick={handleDupCheckClick}
              >
                CHECK
              </button>
            </div>
          </div>
          <div className={styles.setting__warning}>{dupCheckStatus}</div>
          <div className={styles.setting__options}>
            <div className={styles.setting__title}>2FA</div>
            <div className={styles.setting__2FA_div}>
              <input
                type='checkbox'
                checked={isChecked}
                onChange={onChangeChecked}
                className={styles.setting__2FA_checkbox}
              />
            </div>
          </div>
          {isChecked ? (
            <>
              <img src={qrcode} className={styles.setting__qrcode} />
              <div>
                <div className={styles.setting__qr_input}>
                  <input
                    value={qrPin}
                    type='password'
                    placeholder='PIN'
                    maxLength={6}
                    className={styles.setting__displayname_input}
                    onChange={handleQrPinChange}
                    disabled={qrCheckStatus === 'qr확인완료'}
                  />
                  <button
                    className={styles.setting__displayname_button}
                    onClick={handlePinCheckClick}
                    disabled={qrCheckStatus === 'qr확인완료'}
                  >
                    SEND
                  </button>
                </div>
                <div className={styles.setting__warning}>{qrCheckStatus}</div>
              </div>
            </>
          ) : null}
          <div className={modalstyles.modal__buttons}>
            <button className={styles.setting__apply} onClick={onSubmitClick}>
              APPLY
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
