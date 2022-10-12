import {
  Controller,
  Req,
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
import { UserDto } from 'src/database/dto/user.dto';
import { namecheckDto } from './dto/namecheck.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //TODO - method 순서대로 정렬 필요!
  //NOTE - GET
  @ApiTags('users')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '내 프로필 가져오기' })
  @ApiResponse({ status: 200, description: '본인 정보 조회 성공' })
  @ApiResponse({ status: 401, description: '쿠키 인증 실패' })
  @ApiResponse({ status: 404, description: '존재하지 않는 유저' })
  @Get('me')
  async me(@MyUid() uid: number) {
    return await this.usersService.me(uid);
  }

  @ApiTags('users')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '내 프로필 업데이트' })
  @ApiResponse({ status: 201, description: '유저 정보 수정' })
  @ApiResponse({ status: 400, description: '지원하지 않는 이미지 형식' })
  @ApiResponse({ status: 401, description: '쿠키 인증 실패' })
  @ApiResponse({ status: 409, description: '중복된 닉네임' })
  @Post('me')
  async updateprofile(@Body() body: UserDto) {
    return await this.usersService.updateme(body);
  }

  @ApiTags('users')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '닉네임 중복 조회' })
  @ApiResponse({ status: 201, description: '닉네임 중복 조회 성공' })
  @ApiResponse({ status: 401, description: '쿠키 인증 실패' })
  @ApiResponse({ status: 400, description: '존재하는 유저' })
  @Post('namecheck')
  async namecheck(@Body() body: namecheckDto) {
    const result = await this.usersService.namecheck(body.displayName);
    if (result == false) throw new HttpException('Bad Request', 400);
  }

  @ApiTags('users')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '내 친구 목록 가져오기' })
  @Get('friend')
  async friend(@MyUid() uid: number) {
    return await this.usersService.friend(uid);
  }

  @ApiTags('users')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '내 차단 목록 가져오기' })
  @Get('blocklist')
  async blocklist(@MyUid() uid: number) {
    return await this.usersService.blocklist(uid);
  }

  @ApiTags('users')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '랭킹 목록 가져오기' })
  @Get('rank')
  async rank() {
    return await this.usersService.rank();
  }

  @ApiTags('users')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '친구 추가(팔로우)' })
  @Post('follow')
  async follow(@MyUid() uid: number, @Body() body: UidDto) {
    return await this.usersService.follow(uid, body.uid);
  }

  @ApiTags('users')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '친구 삭제(언팔로우)' })
  @Delete('follow')
  async unfollow(@MyUid() uid: number, @Body() body: UidDto) {
    return await this.usersService.unfollow(uid, body.uid);
  }

  @ApiTags('users')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '차단 하기' })
  @Post('block')
  async block(@MyUid() uid: number, @Body() body: UidDto) {
    return await this.usersService.block(uid, body.uid);
  }

  @ApiTags('users')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '차단 해제' })
  @Delete('block')
  async unblock(@MyUid() uid: number, @Body() body: UidDto) {
    return await this.usersService.unblock(uid, body.uid);
  }

  @ApiTags('users')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '전적 보기 (최신 5게임)' })
  @ApiQuery({ name: 'uid' })
  @Get('match')
  async match(@Query('uid') uid) {
    return await this.usersService.match(uid, 5, 1);
  }
}
