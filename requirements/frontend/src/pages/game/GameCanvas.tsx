import { useRef, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userProfileState } from '../../atoms/userProfileState';
import { GameRoomState, CanvasState } from './game.room.dto';

const GameInfo = {
  width: 640,
  height: 660,
  paddlex: 10,
  paddley: 80,
  maxy: (660 - 80) / 2, // (height - paddley) / 2
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
    context.beginPath();
    context.strokeStyle = '#FFFFFF';
    context.setLineDash([20, 20]);
    context.moveTo(GameInfo.width / 2, 0);
    context.lineTo(GameInfo.width / 2, GameInfo.height);
    context.stroke();
    if (status === 0) {
      context.fillText('LOADING...', GameInfo.width / 2, GameInfo.height / 2);
    } else if (status === 2) {
      context.fillText('GAME END', GameInfo.width / 2, GameInfo.height / 2);
    }
    if (gameRoomState !== undefined) {
      // Score
      //  Left
      context.font = '50px Arial, sans-serif';
      context.fillText(
        gameRoomState.score1.toString(),
        GameInfo.width / 4,
        GameInfo.height / 4,
      );
      //  Right
      context.fillText(
        gameRoomState.score2.toString(),
        (GameInfo.width / 4) * 3,
        GameInfo.height / 4,
      );
      // Left Paddle
      context.fillRect(
        0,
        (GameInfo.height - GameInfo.paddley) / 2 + gameRoomState.paddle1,
        GameInfo.paddlex,
        GameInfo.paddley,
      );
      // Right Paddle
      context.fillRect(
        GameInfo.width - GameInfo.paddlex,
        (GameInfo.height - GameInfo.paddley) / 2 + gameRoomState.paddle2,
        GameInfo.paddlex,
        GameInfo.paddley,
      );
      // Ball
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
      //
    }
    context.stroke();
  }

  return <canvas ref={canvasRef}></canvas>;
}
