import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class namecheckDto {
  @ApiProperty()
  @IsString()
  displayName: string;
}
