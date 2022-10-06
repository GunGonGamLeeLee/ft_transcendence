import { Module } from '@nestjs/common';
import { DbFriendListModule } from './db.friend.list/db.friend.list.module';
import { DbUserModule } from './db.user/db.user.module';
import { DatabaseController } from './database.controller';

@Module({
  imports: [DbUserModule, DbFriendListModule],
  controllers: [DatabaseController],
  providers: [],
  exports: [DbUserModule, DbFriendListModule],
})
export class DatabaseModule {}
