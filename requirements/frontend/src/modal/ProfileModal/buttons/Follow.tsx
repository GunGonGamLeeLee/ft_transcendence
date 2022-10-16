import * as React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../../../atoms/authState';
import {
  friendListState,
  pendingFriendState,
} from '../../../atoms/friendListState';
import { chatProfileModalState } from '../../../atoms/modals/chatProfileModalState';
import { userProfileModalState } from '../../../atoms/modals/userProfileModalState';
import { UserDataType } from '../../../atoms/userDataType';
import { FetcherType, useFetch } from '../../../hooks/useFetch';
import styles from './Buttons.module.css';

export function Follow() {
  const { token } = useRecoilValue(authState);
  if (token === null) throw new Error();

  const user =
    useRecoilValue(userProfileModalState) ||
    useRecoilValue(chatProfileModalState); // todo
  if (user === undefined) throw new Error();

  const setPendingFriend = useSetRecoilState(pendingFriendState);
  const friendList = useRecoilValue(friendListState);
  const [isFriend, setIsFriend] = React.useState<boolean>(true);
  const fetcher = useFetch();

  const handleFollowClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const followResponse = await requestFollow(token, fetcher, user.uid);

      setPendingFriend((curr) => [
        ...curr,
        { data: followResponse, isAdd: true },
      ]);

      setIsFriend(true);
    } catch (err) {
      alert('팔로우 실패!');
    }
  };

  const handleUnfollowClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    try {
      await requestUnfollow(token, fetcher, user.uid);

      setPendingFriend((curr) => [...curr, { data: user, isAdd: false }]);

      setIsFriend(false);
    } catch {
      alert('언팔로우 실패!');
    }
  };

  React.useEffect(() => {
    setIsFriend(friendList.get(user.uid) !== undefined);
  }, [user, friendList, setIsFriend]);

  return !isFriend ? (
    <button className={styles.buttons} onClick={handleFollowClick}>
      FOLLOW
    </button>
  ) : (
    <button className={styles.buttons} onClick={handleUnfollowClick}>
      UNFOLLOW
    </button>
  );
}

const requestFollow = async (
  token: string,
  fetcher: FetcherType,
  uid: number,
) => {
  const data: UserDataType = await fetcher(
    token,
    'POST',
    'users/follow',
    {
      uid,
    },
    true,
  );
  return data;
};

const requestUnfollow = async (
  token: string,
  fetcher: FetcherType,
  uid: number,
) => {
  await fetcher(
    token,
    'DELETE',
    'users/follow',
    {
      uid,
    },
    true,
  );
};
