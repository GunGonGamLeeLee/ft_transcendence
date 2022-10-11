import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmLogEntity } from '../entity/entity.dm.log';
import { DbDmLogService } from './db.dm.log.service';

@Module({
  imports: [TypeOrmModule.forFeature([DmLogEntity])],
  providers: [DbDmLogService],
  exports: [DbDmLogService],
})
export class DbDmLogModule {}
