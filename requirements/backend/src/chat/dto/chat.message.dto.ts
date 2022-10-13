import { IsNumber, IsString } from 'class-validator';

export class ChatMessageDto {
  @IsNumber()
  roomId: number;
  @IsString()
  msg: string;
  @IsNumber()
  myUid: number;
}
