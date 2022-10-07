import { ApiProperty } from '@nestjs/swagger';
import { UserRoleInChannel } from '../entity/entity.user.in.channel';

export class UserInChannelDto {
  @ApiProperty()
  uid: number;
  @ApiProperty()
  chid: number;
  @ApiProperty()
  userRole: UserRoleInChannel;
  @ApiProperty({ default: false })
  isMute: boolean;
  @ApiProperty({ default: false })
  isBan: boolean;
}
