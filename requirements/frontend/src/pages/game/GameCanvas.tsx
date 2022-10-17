import { useRef, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userProfileState } from '../../atoms/userProfileState';
import { GameRoomState, CanvasState } from './game.room.dto';

const GameInfo = {
  width: 640,
  height: 360,
  paddlex: 10,
  paddley: 80,
  maxy: (360 - 80) / 2, // (height - paddley) / 2
  ballr: 10,
};

export function GameCanvas({ canvasState }: { canvasState: CanvasState }) {
  const { status, gameRoomState } = canvasState;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  if (canvas) {
    canvas.width = GameInfo.width;
    canvas.height = GameInfo.height;
    const context = canvas.getContext('2d');
    if (context === null) return <></>;
    context.fillStyle = '#000000';
    context.fillRect(0, 0, GameInfo.width, GameInfo.height);
    context.fillStyle = '#FFFFFF';
    context.font = 'italic bold 100px Arial, sans-serif';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    if (status === 0) {
      context.fillText('LOADING...', GameInfo.width / 2, GameInfo.height / 2);
    } else if (status === 1 && gameRoomState !== undefined) {
      context.fillRect(
        0,
        (GameInfo.height - GameInfo.paddley) / 2 + gameRoomState.paddle1,
        GameInfo.paddlex,
        GameInfo.paddley,
      );
      context.fillRect(
        GameInfo.width - GameInfo.paddlex,
        (GameInfo.height - GameInfo.paddley) / 2 + gameRoomState.paddle2,
        GameInfo.paddlex,
        GameInfo.paddley,
      );
      context.beginPath();
      context.arc(
        gameRoomState.ballx + GameInfo.width / 2,
        gameRoomState.bally + GameInfo.height / 2,
        GameInfo.ballr,
        0,
        Math.PI * 2,
      );
      context.fill();
      context.closePath();
    } else if (status === 2) {
      context.fillText('GAME END', GameInfo.width / 2, GameInfo.height / 2);
      if (gameRoomState !== undefined) {
        context.fillRect(
          0,
          (GameInfo.height - GameInfo.paddley) / 2 + gameRoomState.paddle1,
          GameInfo.paddlex,
          GameInfo.paddley,
        );
        context.fillRect(
          GameInfo.width - GameInfo.paddlex,
          (GameInfo.height - GameInfo.paddley) / 2 + gameRoomState.paddle2,
          GameInfo.paddlex,
          GameInfo.paddley,
        );
        context.beginPath();
        context.arc(
          gameRoomState.ballx + GameInfo.width / 2,
          gameRoomState.bally + GameInfo.height / 2,
          GameInfo.ballr,
          0,
          Math.PI * 2,
        );
        context.fill();
        context.closePath();
      }
    }
  }

  return <canvas ref={canvasRef}></canvas>;
}
