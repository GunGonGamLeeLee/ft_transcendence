import {
  Controller,
  Req,
  UseGuards,
  Get,
  Body,
  Post,
  Delete,
  Res,
  HttpException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Uid } from './decorator/uid.decorator';
import { UidDto } from './dto/uid.dto';
import { UsersService } from './users.service';
import { UserDto } from 'src/database/dto/user.dto';
import { Response } from 'express';
import { JoinColumn } from 'typeorm';

// TODO 데코레이터 적용하기.
// TODO 파이프 적용하기.
// TODO 유저 랭킹 api

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //NOTE - GET
  @ApiTags('uesrs')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '내 프로필 가져오기' })
  @ApiResponse({ status: 200, description: '본인 정보 조회 성공' })
  @ApiResponse({ status: 401, description: '쿠키 인증 실패' })
  @ApiResponse({ status: 404, description: '존재하지 않는 유저' })
  @Get('me')
  async me(@Uid() uid) {
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
  async updateprofile(@Req() req, @Body() body: UserDto) {
    const payload: TokenPayloadDto = (req as any).jwtPayload;
    const uid: number = payload.id;
    return await this.usersService.updateme(uid, body);
  }

  @ApiTags('uesrs')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '닉네임 중복 조회' })
  @ApiResponse({ status: 201, description: '닉네임 중복 조회 성공' })
  @ApiResponse({ status: 401, description: '쿠키 인증 실패' })
  @ApiResponse({ status: 404, description: '존재하지 않는 유저' })
  @Post('namecheck')
  async namecheck(@Body() { displayName }: UserDto) {
    const result = await this.usersService.namecheck(displayName);

    if (result) return;

    throw new HttpException('Bad Request', 400);
  }

  @ApiTags('uesrs')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '내 친구 목록 가져오기' })
  @Get('friend')
  async friend(@Uid() uid) {
    return await this.usersService.friend(uid);
  }

  @ApiTags('uesrs')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '내 차단 목록 가져오기' })
  @Get('blocklist')
  async blocklist(@Uid() uid) {
    return await this.usersService.blocklist(uid);
  }

  @ApiTags('uesrs')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '친구 추가(팔로우)' })
  @Post('follow')
  async follow(@Uid() uid, @Body() body: UidDto) {
    return await this.usersService.follow(uid, body.uid);
  }

  @ApiTags('uesrs')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '친구 삭제(언팔로우)' })
  @Delete('follow')
  async unfollow(@Uid() uid, @Body() body: UidDto) {
    return await this.usersService.unfollow(uid, body.uid);
  }

  @ApiTags('uesrs')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '차단 하기' })
  @Post('block')
  async block(@Uid() uid, @Body() body: UidDto) {
    return await this.usersService.block(uid, body.uid);
  }

  @ApiTags('uesrs')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '차단 해제' })
  @Delete('block')
  async unblock(@Uid() uid, @Body() body: UidDto) {
    return await this.usersService.unblock(uid, body.uid);
  }
}
