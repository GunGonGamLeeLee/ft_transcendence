import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gameState } from '../../atoms/gameState';
import { userProfileState } from '../../atoms/userProfileState';
import { socket } from '../../components/Socket/SocketChecker';
import {
  CanvasState,
  ProfileStateType,
  SmallProfileType,
} from './game.room.dto';
import { GameCanvas } from './GameCanvas';
import styles from './Game.module.css';

function DefaultProfile() {
  const userProfile = useRecoilValue(userProfileState);
  return (
    <div>
      <img src={userProfile.imgUri} className={styles.game_profile__img} />
      <span>{userProfile.displayName}</span>
    </div>
  );
}

function GameProfile({ profile }: { profile: SmallProfileType }) {
  return (
    <div>
      <img src={profile.imgUri} className={styles.game_profile__img} />
      <span>{profile.displayName}</span>
    </div>
  );
}

export function Game() {
  const [game, SetGame] = useRecoilState(gameState);
  const [profileState, SetProfileState] = useState<ProfileStateType | null>(
    null,
  );
  const [canvasState, setCanvasState] = useState<CanvasState>({
    status: 0,
    gameRoomState: undefined,
  });
  const [onGame, setOnGame] = useState(false); // ?
  const [upState, setUpState] = useState<Boolean>(false);
  const [downState, setDownState] = useState<Boolean>(false);

  useEffect(() => {
    setCanvasState({
      status: 0,
      gameRoomState: undefined,
    });

    socket.emit('game/match');

    socket.on('game/start', (payload) => {
      SetProfileState({
        profile1: payload.profile1,
        profile2: payload.profile2,
      });
      setCanvasState({ status: 1, gameRoomState: payload });
      setOnGame(true);
    });

    socket.on('game/end', (message) => {
      setCanvasState((prev) => ({ ...prev, status: 2 }));
      setOnGame(false);
    });

    socket.on('game/state', (payload) => {
      setCanvasState((prev) => ({ ...prev, gameRoomState: payload }));
    });

    document.addEventListener('keydown', (key) => {
      if (key.repeat) return;
      if (key.keyCode === 38) {
        setUpState(true);
      } else if (key.keyCode === 40) {
        setDownState(true);
      }
    });

    document.addEventListener('keyup', (key) => {
      if (key.repeat) return;
      if (key.keyCode === 38) {
        setUpState(false);
      } else if (key.keyCode === 40) {
        setDownState(false);
      }
    });

    return () => {
      socket.emit('game/exit');
      socket.off('game/start');
      socket.off('game/end');
      socket.off('game/state');
    };
  }, []);

  // Key Event
  useEffect(() => {
    if (onGame) {
      if (upState) {
        socket.emit('keydown', { code: -1 });
      } else {
        socket.emit('keyup', { code: -1 });
      }
    }
  }, [upState]);

  useEffect(() => {
    if (onGame) {
      if (downState) {
        socket.emit('keydown', { code: 1 });
      } else {
        socket.emit('keyup', { code: 1 });
      }
    }
  }, [downState]);
  return (
    <div>
      {profileState === null ? (
        <DefaultProfile />
      ) : (
        <>
          <GameProfile profile={profileState.profile1} />
          <GameProfile profile={profileState.profile2} />
        </>
      )}
      <GameCanvas canvasState={canvasState} />
    </div>
  );
}
