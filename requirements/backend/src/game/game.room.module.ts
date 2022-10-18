import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DmModule } from 'src/dm/dm.module';
import { GameResultModule } from './game.result.module';
import { GameRoomGateway } from './game.room.gateway';
import { GameRoomService } from './game.room.service';

@Module({
  imports: [DatabaseModule, GameResultModule, DmModule],
  providers: [GameRoomService, GameRoomGateway],
  exports: [GameRoomService],
})
export class GameRoomModule {}
