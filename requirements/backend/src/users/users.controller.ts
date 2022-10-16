import {
  Controller,
  UseGuards,
  Get,
  Body,
  Post,
  Delete,
  HttpException,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { MyUid } from './decorator/uid.decorator';
import { UidDto } from './dto/uid.dto';
import { UsersService } from './users.service';
import { namecheckDto } from './dto/namecheck.dto';
import { ProfileUpdateDto } from './dto/profile.update.dto';
import { DmGateway } from 'src/dm/dm.gateway';

@UseGuards(AuthGuard)
@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly dmGateway: DmGateway,
  ) {}

  //NOTE - GET
  @ApiOperation({ summary: '내 프로필 가져오기' })
  @ApiResponse({ status: 200, description: '본인 정보 조회 성공' })
  @ApiResponse({ status: 401, description: '쿠키 인증 실패' })
  @ApiResponse({ status: 404, description: '존재하지 않는 유저' })
  @Get('me')
  async me(@MyUid() uid: number) {
    return await this.usersService.me(uid);
  }

  @ApiOperation({ summary: '내 친구 목록 가져오기' })
  @Get('friend')
  async friend(@MyUid() uid: number) {
    return await this.usersService.friend(uid);
  }

  @ApiOperation({ summary: '내 차단 목록 가져오기' })
  @Get('blocklist')
  async blocklist(@MyUid() uid: number) {
    return await this.usersService.blocklist(uid);
  }

  @ApiOperation({ summary: '랭킹 목록 가져오기' })
  @Get('rank')
  async rank() {
    return await this.usersService.rank();
  }

  @ApiOperation({ summary: '전적 보기 (최신 5게임)' })
  @ApiQuery({ name: 'uid' })
  @Get('match')
  async match(@Query('uid') uid) {
    return await this.usersService.match(uid, 5, 1);
  }

  //NOTE - POST
  @ApiOperation({ summary: '내 프로필 업데이트' })
  @ApiResponse({ status: 201, description: '유저 정보 수정' })
  @ApiResponse({ status: 400, description: '지원하지 않는 이미지 형식' })
  @ApiResponse({ status: 401, description: '쿠키 인증 실패' })
  @ApiResponse({ status: 409, description: '중복된 닉네임' })
  @Post('me')
  async updateprofile(@MyUid() uid: number, @Body() body: ProfileUpdateDto) {
    const user = await this.usersService.updateme(uid, body);
    this.dmGateway.updateUser(uid);
    return user;
  }

  @ApiOperation({ summary: '닉네임 중복 조회' })
  @ApiResponse({ status: 201, description: '닉네임 중복 조회 성공' })
  @ApiResponse({ status: 401, description: '쿠키 인증 실패' })
  @ApiResponse({ status: 400, description: '존재하는 유저' })
  @Post('namecheck')
  async namecheck(@Body() body: namecheckDto) {
    const result = await this.usersService.namecheck(body.displayName);

    if (result == false) throw new HttpException('Bad Request', 400);
  }

  @ApiOperation({ summary: '친구 추가(팔로우)' })
  @Post('follow')
  async follow(@MyUid() uid: number, @Body() body: UidDto) {
    return await this.usersService.follow(uid, body.uid);
  }

  @ApiOperation({ summary: '차단 하기' })
  @Post('block')
  async block(@MyUid() uid: number, @Body() body: UidDto) {
    return await this.usersService.block(uid, body.uid);
  }

  //NOTE - DELETE
  @ApiOperation({ summary: '친구 삭제(언팔로우)' })
  @Delete('follow')
  async unfollow(@MyUid() uid: number, @Body() body: UidDto) {
    return await this.usersService.unfollow(uid, body.uid);
  }

  @ApiOperation({ summary: '차단 해제' })
  @Delete('block')
  async unblock(@MyUid() uid: number, @Body() body: UidDto) {
    return await this.usersService.unblock(uid, body.uid);
  }
}
