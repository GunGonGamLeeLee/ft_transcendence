import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  uid: number;
  @ApiProperty({ example: 'jaham' })
  displayName: string;
  @ApiProperty({ example: 'http://localhost:4243/img/uid.png' })
  imgUri: string;
  @ApiProperty()
  rating: number;
  @ApiProperty({ example: false })
  mfaNeed: boolean;
  @ApiProperty()
  qrSecret: string;
}
