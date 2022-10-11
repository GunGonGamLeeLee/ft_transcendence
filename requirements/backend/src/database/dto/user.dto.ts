import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  uid: number;
  @ApiProperty({ example: 'jaham' })
  displayName: string;
  @ApiProperty({ example: '/path/to/avatar/in/server' })
  imgUri: string;
  @ApiProperty()
  rating: number;
  @ApiProperty({ example: false })
  mfaNeed: boolean;
  @ApiProperty()
  qrSecret: string;
}
