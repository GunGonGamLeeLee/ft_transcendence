import { ApiProperty } from '@nestjs/swagger';

export class DmLogDto {
  @ApiProperty({ example: '0' })
  fromUid: number;
  @ApiProperty({ example: '1' })
  toUid: number;
  @ApiProperty({ example: new Date() })
  time: string;
  @ApiProperty({ example: '행복한 클러스터 코딩!' })
  content: string;
}
