import { IsNumber, IsString, Length } from 'class-validator';

export class ChannelPasswordDto {
  @IsNumber()
  chid: number;
  @Length(0, 4)
  @IsString()
  password?: string;
}
