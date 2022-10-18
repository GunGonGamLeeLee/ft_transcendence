import { Module } from '@nestjs/common';
import { GameMatchModule } from './game.match.module';
import { GameRoomModule } from './game.room.module';

@Module({
  imports: [GameRoomModule, GameMatchModule],
})
export class GameModule {}
