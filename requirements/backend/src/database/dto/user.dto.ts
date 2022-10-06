import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  uid: number;
  @ApiProperty({ example: 'jaham' })
  displayName: string;
  @ApiProperty({ example: '/path/to/avatar/in/server' })
  avatarPath: string;
  @ApiProperty()
  rating: number;
  @ApiProperty({ example: false })
  isRequiredTFA: boolean;
  @ApiProperty()
  qrSecret: string;
}
