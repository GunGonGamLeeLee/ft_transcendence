import { Module } from '@nestjs/common';
import { DbMatchHistoryService } from './db.match.history/db.match.history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './db.user/entity.user';
import { DbUserService } from './db.user/db.user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [DbUserService, DbMatchHistoryService],
  exports: [DbUserService],
})
export class DatabaseModule {}
