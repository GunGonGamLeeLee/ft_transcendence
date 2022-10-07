import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInChannelEntity } from '../entity/entity.user.in.channel';
import { DbUserInChannelService } from './db.user.in.channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserInChannelEntity])],
  providers: [DbUserInChannelService],
  exports: [DbUserInChannelService],
})
export class DbUserInChannelModule {}
