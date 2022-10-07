import { Module } from '@nestjs/common';
import { DbBlockListService } from './db.block.list.service';

@Module({
  providers: [DbBlockListService],
})
export class DbBlockListModule {}
