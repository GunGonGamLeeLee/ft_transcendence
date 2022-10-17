import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GameResultService } from './game.result.service';
import { GameController } from './game.controller';

@Module({
  imports: [DatabaseModule],
  providers: [GameResultService],
  controllers: [GameController],
})
export class GameModule {}
