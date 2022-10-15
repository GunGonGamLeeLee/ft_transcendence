import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class ChannelPasswordDto {
  @ApiProperty()
  @IsNumber()
  chid: number;
  @ApiProperty()
  @Length(4, 4)
  @IsString()
  password: string;
}
