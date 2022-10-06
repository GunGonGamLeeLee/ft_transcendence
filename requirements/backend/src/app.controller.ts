import {
  Controller,
  Get,
  Redirect,
  Response,
  Next,
  Header,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { DbFriendListService } from './database/db.friend.list/db.friend.list.service';
import { FriendListEntity } from './database/entity/entity.friend.list';
import { DbUserService } from './database/db.user/db.user.service';
import { UserEntity } from './database/entity/entity.user';

function hello(): string {
  return 'hello';
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users/me')
  getMyProfile() {
    return {
      id: 99945,
      displayName: 'jaham',
      imgUri:
        'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
      rating: 2048,
    };
  }

  @Post('users/me')
  updateMyProfile(@Req() req: Request) {
    const body = req.body;
    console.log(body);
  }

  @Get('users/friend')
  getFriendList() {
    return [
      {
        id: 1,
        displayName: 'jaham',
        imgUri:
          'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
        rating: 2048,
      },
      {
        id: 2,
        displayName: 'jeongble',
        imgUri:
          'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
        rating: 1024,
      },
      {
        id: 3,
        displayName: 'yeju',
        imgUri:
          'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
        rating: 4096,
      },
    ];
  }

  @Get('users/rank')
  getRankList() {
    return [
      {
        id: 2,
        displayName: 'jeongble',
        imgUri:
          'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
        rating: 4096,
      },
      {
        id: 3,
        displayName: 'yeju',
        imgUri:
          'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
        rating: 2048,
      },
      {
        id: 1,
        displayName: 'jaham',
        imgUri:
          'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
        rating: 1024,
      },
    ];
  }
}
