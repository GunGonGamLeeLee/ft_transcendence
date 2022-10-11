import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto {
  @ApiProperty({ example: '42GunGonGamLeeLee' })
  chName: string;
  @ApiProperty()
  chOwnerId: number;
  @ApiProperty({ example: true })
  display: boolean;
  @ApiProperty({ example: false })
  isLocked: boolean;
  @ApiProperty({ example: '01234' })
  password: string;
}
