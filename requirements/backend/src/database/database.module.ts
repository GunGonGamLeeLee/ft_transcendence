import { Module } from '@nestjs/common';
import { DbUserModule } from './db.user/db.user.module';
import { DatabaseController } from './database.controller';
import { DbFriendListModule } from './db.friend.list/db.friend.list.module';
import { DbBlockListModule } from './db.block.list/db.block.list.module';
import { DatabaseService } from './database.service';
import { DbChannelModule } from './db.channel/db.channel.module';
import { DbUserInChannelModule } from './db.user.in.channel/db.user.in.channel.module';
import { DbDmLogModule } from './db.dm.log/db.dm.log.module';

@Module({
  imports: [
    DbUserModule,
    DbFriendListModule,
    DbBlockListModule,
    DbChannelModule,
    DbUserInChannelModule,
    DbDmLogModule,
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
