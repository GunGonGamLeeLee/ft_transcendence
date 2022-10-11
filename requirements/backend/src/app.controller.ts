import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
<<<<<<< HEAD
<<<<<<< HEAD

=======
import { DbFriendListService } from './database/db.friend.list/db.friend.list.service';
import { FriendListEntity } from './database/entity/entity.friend.list';
import { DbUserService } from './database/db.user/db.user.service';
import { UserEntity } from './database/entity/entity.user';
=======
>>>>>>> 7aa287e (style: 백엔드 코드 복구)

function hello(): string {
  return 'hello';
}
>>>>>>> 749f6e2 (feat: sidebar 구현)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
