import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GameRoomModule } from './game.room.module';
import { GameMatchGateway } from './game.match.gateway';
import { GameMatchService } from './game.match.service';

@Module({
  imports: [GameRoomModule, DatabaseModule],
  providers: [GameMatchService, GameMatchGateway],
})
export class GameMatchModule {}
