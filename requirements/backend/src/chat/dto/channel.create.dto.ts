import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length, Max, Min } from 'class-validator';
import { ChannelMode } from 'src/database/entity/entity.channel';

export class ChannelCreateDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(2)
  mode: ChannelMode;

  @ApiProperty()
  @IsString()
  @Length(0, 4)
  password?: string;
}
