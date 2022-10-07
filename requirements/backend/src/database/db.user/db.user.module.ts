import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbUserService } from './db.user.service';
import { UserEntity } from '../entity/entity.user';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [DbUserService],
  exports: [DbUserService],
})
export class DbUserModule {}
