import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MatchHistoryDto } from 'src/database/dto/match.history.dto';
import { GameResultService } from './game.result.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameResultService: GameResultService) {}

  @ApiTags('game')
  @ApiOperation({ summary: '게임 결과 계산 테스트' })
  @Post('game-result')
  async calcGameResult(@Body() body: MatchHistoryDto) {
    this.gameResultService.saveResult(body);
  }
}
