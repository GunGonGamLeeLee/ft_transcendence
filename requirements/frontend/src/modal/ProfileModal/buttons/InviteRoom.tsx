import * as React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../../../atoms/authState';
import { RoleType } from '../../../atoms/chatUserType';
import { currRoomState } from '../../../atoms/currRoomState';
import { refreshChannelListState } from '../../../atoms/refreshChannelListState';
import { useFetch } from '../../../hooks/useFetch';
import { getChId } from '../../../utils/getChId';
import styles from './Buttons.module.css';

export function InviteRoom({ uid }: { uid: number }) {
  const fetcher = useFetch();
  const setRefreshChannelList = useSetRecoilState(refreshChannelListState);
  const currRoom = useRecoilValue(currRoomState);
  if (currRoom === null) throw new Error();

  const { token } = useRecoilValue(authState);
  if (token === null) throw new Error();

  const handleInviteRoomClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    try {
      await fetcher(
        token,
        'POST',
        'chat/invite',
        {
          uid,
          chid: getChId(currRoom.roomId),
          role: RoleType.USER,
          isMute: false,
          isBan: false,
        },
        false,
      );

      setRefreshChannelList(true);
    } catch {
      alert('INVITE CHAT FAIL');
    }
  };

  return (
    <button className={styles.buttons} onClick={handleInviteRoomClick}>
      INVITE ROOM
    </button>
  );
}
