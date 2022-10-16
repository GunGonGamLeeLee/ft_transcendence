import { IsNumber, IsString, Length } from 'class-validator';

export class ChatPasswordDto {
  @IsNumber()
  roomId: number;
  @IsNumber()
  myUid: number;
  @IsString()
  @Length(0, 4) //0글자~4글자
  password: string;
}