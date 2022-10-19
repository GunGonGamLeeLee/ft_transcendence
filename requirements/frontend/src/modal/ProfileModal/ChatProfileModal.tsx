import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { blockedListState } from '../../atoms/blockedListState';
import { ChatUserType, RoleType } from '../../atoms/chatUserType';
import { currRoleState } from '../../atoms/currRoleState';
import { friendListState } from '../../atoms/friendListState';
import { chatProfileModalState } from '../../atoms/modals/chatProfileModalState';
import { userProfileState } from '../../atoms/userProfileState';
import { Follow } from './buttons/Follow';
import { Block } from './buttons/Block';
import { Unblock } from './buttons/Unblock';
import { RedCross } from '../buttons/RedCross';
import styles from './ProfileModal.module.css';
import buttonstyles from './buttons/Buttons.module.css';
import modalstyles from '../Modal.module.css';
import { InviteGame } from './buttons/InviteGame';
import { DM } from './buttons/DirectMessage';
import { socket } from '../../components/Socket/SocketChecker';
import {
  currBanListState,
  currMuteListState,
  currRoomState,
  RoomType,
} from '../../atoms/currRoomState';
import { getChId } from '../../utils/getChId';
import { UserDataType } from '../../atoms/userDataType';
import { authState } from '../../atoms/authState';
import {
  matchHistoryListState,
  requestMatchHistory,
} from '../../atoms/modals/matchHistoryListState';
import { MatchHistoryList } from './MatchHistoryList';

export function ChatProfileModal() {
  const chatProfileModal = useRecoilValue(chatProfileModalState);

  return (
    <>
      {chatProfileModal === undefined ? (
        <></>
      ) : (
        <ChatProfile user={chatProfileModal} />
      )}
    </>
  );
}

function ChatProfile({ user }: { user: ChatUserType }) {
  const setChatProfileModal = useSetRecoilState(chatProfileModalState);
  const currRole = useRecoilValue(currRoleState);
  const currRoom = useRecoilValue(currRoomState);
  const currBanList = useRecoilValue(currBanListState);
  const currMuteList = useRecoilValue(currMuteListState);
  const userProfile = useRecoilValue(userProfileState);
  const friendList = useRecoilValue(friendListState);
  const blockedList = useRecoilValue(blockedListState);
  const [isBlocked, setIsBlocked] = React.useState<boolean>(false);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(
    user.role === RoleType.ADMIN,
  );
  const setMatchHistory = useSetRecoilState(matchHistoryListState);

  const { token } = useRecoilValue(authState);
  if (token === null) throw new Error();

  const onClick = () => {
    setChatProfileModal(undefined);
  };

  React.useEffect(() => {
    setIsBlocked(
      blockedList.find((curr) => curr.uid === user.uid) !== undefined,
    );
  }, [friendList, blockedList]);

  React.useEffect(() => {
    const matchHistoryQuery = async () => {
      const newHistory = await requestMatchHistory(token, user.uid);
      setMatchHistory(newHistory);
    };

    matchHistoryQuery();

    return setMatchHistory([]);
  }, [token, user]);

  return (
    <>
      <div className={modalstyles.modal}>
        <div className={modalstyles.modal__blank} onClick={onClick}></div>
        <div className={styles.profile}>
          <div className={modalstyles.modal__header}>
            <span className={modalstyles.modal__headertitle}>PROFILE</span>
            <RedCross onClick={onClick} />
          </div>
          <div className={styles.profile__display}>
            <img src={user.imgUri} className={styles.profile__img} />
            <div className={styles.profile__text}>
              <div className={styles.profile__name}>{user.displayName}</div>
              <div className={styles.profile__rating}>
                Rating: {user.rating}
              </div>
            </div>
          </div>
          <MatchHistoryList myUid={user.uid} />
          {userProfile.uid === user.uid ? (
            <></>
          ) : (
            <>
              <div className={styles.profile__buttons}>
                {currRole === RoleType.OWNER ? (
                  isAdmin === false ? (
                    <ProfileButton
                      text='임명'
                      onClick={() => {
                        socket.emit(
                          'chat/addAdmin',
                          makeSocketPayload(currRoom, userProfile, user),
                        );

                        setIsAdmin(true);
                      }}
                    />
                  ) : (
                    <ProfileButton
                      text='해임'
                      onClick={() => {
                        socket.emit(
                          'chat/deleteAdmin',
                          makeSocketPayload(currRoom, userProfile, user),
                        );

                        setIsAdmin(false);
                      }}
                    />
                  )
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.profile__buttons}>
                {currRole === RoleType.OWNER ||
                (currRole === RoleType.ADMIN && user.role === RoleType.USER) ? (
                  <>
                    {currBanList.find((uid) => uid === user.uid) ===
                    undefined ? (
                      <ProfileButton
                        text='BAN'
                        onClick={() => {
                          socket.emit(
                            'chat/addBan',
                            makeSocketPayload(currRoom, userProfile, user),
                          );

                          setChatProfileModal(undefined);
                        }}
                      />
                    ) : (
                      <ProfileButtonDisabled text='BAN' />
                    )}
                    {currMuteList.find((uid) => uid === user.uid) ===
                    undefined ? (
                      <ProfileButton
                        text='MUTE'
                        onClick={() => {
                          socket.emit(
                            'chat/addMute',
                            makeSocketPayload(currRoom, userProfile, user),
                          );
                        }}
                      />
                    ) : (
                      <ProfileButtonDisabled text='MUTE' />
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.profile__buttons}>
                <Follow />
                {!isBlocked ? <Block /> : <Unblock />}
              </div>
              <div className={styles.profile__buttons}>
                <InviteGame uid={user.uid} />
                <DM user={user} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function ProfileButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button className={buttonstyles.buttons} onClick={onClick}>
      {text}
    </button>
  );
}

function ProfileButtonDisabled({ text }: { text: string }) {
  return (
    <button className={buttonstyles.buttons} disabled={true}>
      {text}
    </button>
  );
}

function makeSocketPayload(
  currRoom: RoomType | null,
  me: UserDataType,
  other: ChatUserType,
) {
  return {
    chid: getChId(currRoom?.roomId),
    myUid: me.uid,
    targetUid: other.uid,
  };
}
