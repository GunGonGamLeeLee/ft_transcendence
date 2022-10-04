import { Module } from '@nestjs/common';
import { DbUserService } from './db.user/db.user.service';
import { DbMatchHistoryService } from './db.match.history/db.match.history.service';
import { DbFriendListService } from './db.friend.list/db.friend.list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './db.user/entity.user';

@Module({
  imports: [
    // FIXME env setting
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 4245,
      username: 'postgres',
      password: '1234',
      database: 'User',
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [DbUserService, DbMatchHistoryService, DbFriendListService],
})
export class DatabaseModule {}
