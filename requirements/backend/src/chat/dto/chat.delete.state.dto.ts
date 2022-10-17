import { IsNumber } from 'class-validator';

export class ChatDeleteStateDto {
  @IsNumber()
  chid: number;
  @IsNumber()
  targetUid: number;
}
