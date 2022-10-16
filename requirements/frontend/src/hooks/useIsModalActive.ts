import * as React from 'react';
import { userProfileModalState } from '../atoms/modals/userProfileModalState';
import { chatInviteModalState } from '../atoms/modals/chatInviteModalState';
import { chatProfileModalState } from '../atoms/modals/chatProfileModalState';
import { gameInviteModalState } from '../atoms/modals/gameInviteModalState';
import { newRoomModalState } from '../atoms/modals/newRoomModalState';
import { setRoomModalState } from '../atoms/modals/setRoomModalState';
import { userSettingModalState } from '../atoms/modals/userSettingModalState';
import { useRecoilValue } from 'recoil';

export const useIsModalActive = () => {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const userProfileModal = useRecoilValue(userProfileModalState);
  const chatInviteModal = useRecoilValue(chatInviteModalState);
  const chatProfileModal = useRecoilValue(chatProfileModalState);
  const gameInviteModal = useRecoilValue(gameInviteModalState);
  const newRoomModal = useRecoilValue(newRoomModalState);
  const setRoomModal = useRecoilValue(setRoomModalState);
  const userSettingModal = useRecoilValue(userSettingModalState);

  React.useEffect(() => {
    setIsActive(
      userProfileModal !== undefined ||
        chatInviteModal !== undefined ||
        chatProfileModal !== undefined ||
        gameInviteModal !== undefined ||
        newRoomModal !== false ||
        setRoomModal !== false ||
        userSettingModal !== false,
    );
  }, [
    userProfileModal,
    chatInviteModal,
    chatProfileModal,
    gameInviteModal,
    newRoomModal,
    setRoomModal,
    userSettingModal,
  ]);

  return isActive;
};
