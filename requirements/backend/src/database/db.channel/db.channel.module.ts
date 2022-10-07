import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelEntity } from '../entity/entity.channel';
import { DbChannelService } from './db.channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEntity])],
  providers: [DbChannelService],
  exports: [DbChannelService],
})
export class DbChannelModule {}
