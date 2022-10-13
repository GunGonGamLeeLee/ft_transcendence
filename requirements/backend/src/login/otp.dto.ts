import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class optDto {
  @ApiProperty()
  @IsString()
  pin: string;
}
