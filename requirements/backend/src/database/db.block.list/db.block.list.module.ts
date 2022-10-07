import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockListEntity } from '../entity/entity.block.list';
import { DbBlockListService } from './db.block.list.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlockListEntity])],
  providers: [DbBlockListService],
  exports: [DbBlockListService],
})
export class DbBlockListModule {}
