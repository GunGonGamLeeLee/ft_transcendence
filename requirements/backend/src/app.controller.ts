import { Controller, Get } from '@nestjs/common';
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

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
