import { IsNumber } from 'class-validator';

export class ChatDeleteStateDto {
  @IsNumber()
  roomId: number;
  @IsNumber()
  targetUid: number;
}