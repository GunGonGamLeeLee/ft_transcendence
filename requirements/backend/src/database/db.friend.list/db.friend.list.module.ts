import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbFriendListService } from './db.friend.list.service';
import { FriendListEntity } from '../entity/entity.friend.list';

@Module({
  imports: [TypeOrmModule.forFeature([FriendListEntity])],
  providers: [DbFriendListService],
  exports: [DbFriendListService],
})
export class DbFriendListModule {}
