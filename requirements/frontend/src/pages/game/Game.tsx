import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gameState } from '../../atoms/gameState';
import { socket } from '../../components/Socket/SocketChecker';
import { CanvasState, ProfileStateType } from './game.room.dto';
import { GameCanvas } from './GameCanvas';
import styles from './Game.module.css';
import { BackButton } from '../../components/BackButton';
import { DefaultProfile, DefaultProfile2, GameProfile } from './GameProfile';
import { useNavigate } from 'react-router-dom';

export function Game() {
  const [game, SetGame] = useRecoilState(gameState);
  const navigator = useNavigate();
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

    console.log(game);
    if (game === null) {
      navigator('/lobby', { replace: true });
      throw new Error();
    }

    switch (game.mode) {
      case 0:
        socket.emit('game/match');
        break;
      case 1:
        socket.emit('game/invite', { uid: game.Id, speed: game.speed });
        break;
      case 2:
        socket.emit('game/invited', { uid: game.Id });
        break;
      case 3:
        socket.emit('game/spec', { uid: game.Id });
        break;
      default:
        throw new Error();
    }

    if (game.mode !== 3) {
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
    }

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

    socket.on('game/error', (payload) => {
      alert('상대를 찾을 수 없습니다.');
      navigator('/lobby');
    });

    return () => {
      SetGame(null);
      socket.emit('game/unmatch');
      socket.emit('game/exit');
      socket.off('game/start');
      socket.off('game/end');
      socket.off('game/state');
      socket.off('game/error');
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
    <div className={styles.game__page}>
      <div className={styles.game__header}>
        <BackButton to='/lobby' />
        <div className={styles.game_warning}>
          <img src='/warning.png' className={styles.game_warning__icon} />
          <div className={styles.game_warning__text}>
            게임 중 나가거나 새로고침 시 패배 처리됩니다.
          </div>
        </div>
      </div>
      <div className={styles.game__main}>
        {profileState === null ? (
          <DefaultProfile />
        ) : (
          <>
            <GameProfile profile={profileState.profile1} />
          </>
        )}
        <GameCanvas canvasState={canvasState} />
        {profileState === null ? (
          <DefaultProfile2 />
        ) : (
          <>
            <GameProfile profile={profileState.profile2} />
          </>
        )}
      </div>
    </div>
  );
}
