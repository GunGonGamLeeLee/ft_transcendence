import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbMatchHistoryService } from './db.match.history.service';
import { MatchHistoryEntity } from '../entity/entity.matchhistory.list';

@Module({
  imports: [TypeOrmModule.forFeature([MatchHistoryEntity])],
  providers: [DbMatchHistoryService],
  exports: [DbMatchHistoryService],
})
export class DbMatchHistoryModule {}
