import { ApiProperty } from '@nestjs/swagger';

export class UidDto {
  @ApiProperty({ default: 0 })
  id: number;
}