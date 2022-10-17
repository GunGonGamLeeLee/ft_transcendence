import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GameRoomGateway } from './game.gateway';
import { GameRoomService } from './game.service';

@Module({
  imports: [DatabaseModule],
  providers: [GameRoomService, GameRoomGateway],
  exports: [GameRoomService],
})
export class GameRoomModule {}
