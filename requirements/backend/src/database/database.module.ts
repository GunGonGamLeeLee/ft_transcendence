import { Module } from '@nestjs/common';
import { DbFriendListModule } from './db.friend.list/db.friend.list.module';
import { DbUserModule } from './db.user/db.user.module';
import { DatabaseController } from './database.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DbUserModule, DbFriendListModule, AuthModule],
  controllers: [DatabaseController],
  providers: [],
  exports: [DbUserModule, DbFriendListModule],
})
export class DatabaseModule {}
