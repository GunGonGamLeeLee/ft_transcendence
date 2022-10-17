import { IsNumber, IsString } from 'class-validator';

export class ChatMessageDto {
  @IsNumber()
  chid: number;
  @IsString()
  msg: string;
  @IsNumber()
  myUid: number;
}
