import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { DmModule } from 'src/dm/dm.module';

@Module({
  imports: [DatabaseModule, AuthModule, DmModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
