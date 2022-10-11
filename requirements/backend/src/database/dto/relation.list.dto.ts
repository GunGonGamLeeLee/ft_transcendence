import { ApiProperty } from '@nestjs/swagger';

export class RelationListDto {
  @ApiProperty()
  fromUid: number;
  @ApiProperty()
  toUid: number;
}
