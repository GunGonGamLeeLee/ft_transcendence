import { ApiProperty } from '@nestjs/swagger';
import { ChannelMode } from '../entity/entity.channel';

export class ChannelDto {
  @ApiProperty({ example: '42GunGonGamLeeLee' })
  chName: string;
  @ApiProperty()
  chOwnerId: number;
  @ApiProperty({ example: 0 })
  mode: ChannelMode;
  @ApiProperty({ example: '01234' })
  password: string;
}
