import { IsNumber } from 'class-validator';

export class ChatRoleDto {
  @IsNumber()
  chid: number;
  @IsNumber()
  myUid: number;
  @IsNumber()
  targetUid: number;
}
