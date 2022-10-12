import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class ProfileUpdateDto {
  @ApiProperty()
  @IsString()
  displayName: string;
  @ApiProperty()
  @IsString()
  imgData:string // 이미지 데이터
  @ApiProperty()
  @IsBoolean()
  mfaNeed: boolean;
  
  // imgUri: string; // 이미지 uri 고정. img/uid
}
