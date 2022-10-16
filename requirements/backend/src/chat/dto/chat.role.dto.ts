import { IsNumber } from 'class-validator';

export class ChatRoleDto {
  @IsNumber()
  roomId: number;
  @IsNumber()
  myUid: number;
  @IsNumber()
  targetUid: number;
}