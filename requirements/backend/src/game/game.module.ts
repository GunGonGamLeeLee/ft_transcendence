import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GameResultService } from './game.result.service';
import { GameController } from './game.controller';
import { DmModule } from 'src/dm/dm.module';

@Module({
  imports: [DatabaseModule, DmModule],
  providers: [GameResultService],
  controllers: [GameController],
})
export class GameModule {}
