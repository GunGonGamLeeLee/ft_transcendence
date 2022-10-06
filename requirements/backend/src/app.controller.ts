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
  constructor(
    private readonly appService: AppService,
    private readonly dbUserSerivce: DbUserService,
    private readonly dbFriendListSerivce: DbFriendListService,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('user-save')
  userSave() {
    this.dbUserSerivce.saveOne({
      uid: 1234,
      displayName: 'asdfasdf',
      avatarPath: '',
      rating: 0,
      twoFactor: false,
      qrSecret: '',
    });
  }

  @Get('friend-save')
  async friendSave() {
    const user = await this.dbUserSerivce.findOneById(1234);
    this.dbFriendListSerivce.saveOne({ fuid: 1234, tuid: 1111 }, user);
  }

  @Get('friend-list')
  friends() {
    return this.dbUserSerivce.findFriendList(1234);
  }
}
