import { ApiProperty } from '@nestjs/swagger';

export class DmLogDto {
  @ApiProperty({ example: '0000' })
  fromUid: number;
  @ApiProperty({ example: '0001' })
  toUid: number;
  @ApiProperty({ example: new Date() })
  time: number;
  @ApiProperty({ example: '행복한 클러스터 코딩!' })
  content: string;
}
