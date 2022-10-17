import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { GameRoomModule } from './game.module';
import { MatchMakingGateway } from './match.gateway';
import { MatchMakingService } from './match.service';

@Module({
  imports: [GameRoomModule, DatabaseModule],
  providers: [MatchMakingService, MatchMakingGateway],
})
export class MatchMakingModule {}
