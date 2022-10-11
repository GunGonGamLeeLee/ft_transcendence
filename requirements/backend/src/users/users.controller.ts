import {
  Controller,
  Req,
  UseGuards,
  Get,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { TokenPayloadDto } from '../login/token.payload.dto';
import { UidDto } from './dto/uid.dto';
import { UsersService } from './users.service';

// TODO 데코레이터 적용하기.
// TODO 파이프 적용하기.
// TODO 유저 랭킹 api

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //NOTE - GET
  @ApiTags('uesrs')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '내 프로필 가져오기' })
  @Get('me')
  async me(@Req() req) {
    const payload: TokenPayloadDto = (req as any).jwtPayload;
    const uid: number = payload.id;
    return await this.usersService.me(uid);
  }

  @ApiTags('uesrs')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '내 친구 목록 가져오기' })
  @Get('friend')
  async friend(@Req() req) {
    const payload: TokenPayloadDto = (req as any).jwtPayload;
    const uid: number = payload.id;
    return await this.usersService.friend(uid);
  }

  @ApiTags('uesrs')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '내 차단 목록 가져오기' })
  @Get('blocklist')
  async blocklist(@Req() req) {
    const payload: TokenPayloadDto = (req as any).jwtPayload;
    const uid: number = payload.id;
    return await this.usersService.blocklist(uid);
  }

  @ApiTags('uesrs')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '친구 추가(팔로우)' })
  @Post('follow')
  async follow(@Req() req, @Body() body: UidDto) {
    const payload: TokenPayloadDto = (req as any).jwtPayload;
    const uid: number = payload.id;
    return await this.usersService.follow(uid, body.id);
  }

  @ApiTags('uesrs')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '친구 삭제(언팔로우)' })
  @Delete('follow')
  async unfollow(@Req() req, @Body() body: UidDto) {
    const payload: TokenPayloadDto = (req as any).jwtPayload;
    const uid: number = payload.id;
    return await this.usersService.unfollow(uid, body.id);
  }

  @ApiTags('uesrs')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '차단 하기' })
  @Post('block')
  async block(@Req() req, @Body() body: UidDto) {
    const payload: TokenPayloadDto = (req as any).jwtPayload;
    const uid: number = payload.id;
    return await this.usersService.block(uid, body.id);
  }

  @ApiTags('uesrs')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '차단 해제' })
  @Delete('block')
  async unblock(@Req() req, @Body() body: UidDto) {
    const payload: TokenPayloadDto = (req as any).jwtPayload;
    const uid: number = payload.id;
    return await this.usersService.unblock(uid, body.id);
  }
}
