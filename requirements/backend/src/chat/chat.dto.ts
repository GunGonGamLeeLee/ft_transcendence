import { ApiProperty } from '@nestjs/swagger';

export class ChatDto {
  @ApiProperty()
  roomName: string;
  @ApiProperty()
  roomId: number;
  @ApiProperty()
  myUid: number;
  @ApiProperty()
  targetUid: number;
  @ApiProperty()
  password: string;
  @ApiProperty()
  msg: string;
}
