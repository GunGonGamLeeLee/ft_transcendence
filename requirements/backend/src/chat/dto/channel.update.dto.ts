import { IsEnum, IsNumber, IsString, Length } from 'class-validator';
import { ChannelMode } from 'src/database/entity/entity.channel';

export class ChannelUpdateDto {
  @IsNumber()
  chid: number;
  @IsString()
  chName: string;
  @IsEnum(ChannelMode)
  mode: ChannelMode;
  @IsString()
  @Length(0, 4) //0글자~4글자
  password: string;
}
