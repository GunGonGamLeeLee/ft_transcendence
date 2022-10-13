import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ChatMassageDto {
  @ApiProperty()
  @IsString()
  msg: string;
  @ApiProperty()
  @IsNumber()
  uid: number;
}
