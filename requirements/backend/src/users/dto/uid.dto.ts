import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UidDto {
  @ApiProperty({ default: 0 })
  @IsInt()
  uid: number;
}
