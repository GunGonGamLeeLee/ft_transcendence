import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GameRoomGateway } from './game.room.gateway';
import { GameRoomService } from './game.room.service';

@Module({
  imports: [DatabaseModule],
  providers: [GameRoomService, GameRoomGateway],
  exports: [GameRoomService],
})
export class GameRoomModule {}
