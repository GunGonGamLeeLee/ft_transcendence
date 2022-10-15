import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { DatabaseService } from 'src/database/database.service';
import { MyUid } from 'src/users/decorator/uid.decorator';
import { UserDataType } from 'src/users/dto/user.data.type.dto';

export interface DmLogType {
  fromUid: number;
  toUid: number;
  content: string;
  time: Date;
}

export interface DmLogInfo {
  target: UserDataType;
  logs: DmLogType[];
}

@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
@Controller('dm')
export class DmController {
  constructor(private readonly database: DatabaseService) {}

  @ApiTags('dm/log')
  @ApiOperation({ summary: '유저와 상대방의 dm 로그 보기' })
  @ApiQuery({ name: 'target_uid', type: 'number' })
  @Get('log')
  async dmLog(
    @MyUid() myUid,
    @Query('target_uid', ParseIntPipe) target_uid: number,
  ): Promise<DmLogInfo> {
    return {
      target: await this.database.findOneUserData(target_uid),
      logs: await this.database.listDmOfUser(myUid, target_uid),
    };
  }
}
