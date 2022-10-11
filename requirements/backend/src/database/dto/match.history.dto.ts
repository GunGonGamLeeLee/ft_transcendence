import { ApiProperty } from '@nestjs/swagger';

export class MatchHistoryDto {
  @ApiProperty()
  winnerUid: number;
  @ApiProperty()
  loserUid: number;
  @ApiProperty()
  isRank: boolean;
}
