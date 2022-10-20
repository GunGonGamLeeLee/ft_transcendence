import { IsNumber, IsString, Length } from 'class-validator';

export class DmChatDto {
  @IsNumber()
  targetUid: number;
  @IsString()
  @Length(1, 512)
  msg: string;
}
