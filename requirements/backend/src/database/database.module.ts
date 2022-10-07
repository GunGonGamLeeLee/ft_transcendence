import { Module } from '@nestjs/common';
import { DbUserModule } from './db.user/db.user.module';
import { DatabaseController } from './database.controller';
import { DbFriendListModule } from './db.friend.list/db.friend.list.module';
import { DbBlockListModule } from './db.block.list/db.block.list.module';
// import { DbMatchHistoryModule } from './db.match.history/db.match.history.module';

@Module({
  imports: [DbUserModule, DbFriendListModule, DbBlockListModule],//, DbMatchHistoryModule],
  controllers: [DatabaseController],
  providers: [],
  exports: [DbUserModule, DbFriendListModule, DbBlockListModule],//, DbMatchHistoryModule],
})
export class DatabaseModule {}
