import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MatchHistoryDto } from 'src/database/dto/match.history.dto';
import { DmGateway } from 'src/dm/dm.gateway';

const K = 10; // Elo 가중치

@Injectable()
export class GameResultService {
  constructor(
    private readonly database: DatabaseService,
    private readonly dmGateway: DmGateway,
  ) {}

  async saveResult(gameResult: MatchHistoryDto) {
    const winner = await this.database.findOneUser(gameResult.winnerUid);
    const loser = await this.database.findOneUser(gameResult.loserUid);

    if (gameResult.isRank) {
      winner.rating = this.calcRating(winner.rating, loser.rating, true);
      loser.rating = this.calcRating(loser.rating, winner.rating, false);
    }

    console.log(
      `game.result.service: updateRating: winner.rating ${winner.rating}`,
    );
    console.log(
      `game.result.service: updateRating: loser.rating ${loser.rating}`,
    );

    this.database.saveGameResult(gameResult, winner, loser);
    this.dmGateway.updateUser(gameResult.winnerUid);
    this.dmGateway.updateUser(gameResult.loserUid);
  }

  private calcRating(player1: number, player2: number, isWin: boolean): number {
    const we = 1 / (Math.pow(10, (player2 - player1) / 400) + 1);
    const w = isWin ? 1 : 0;
    return Math.max(Math.floor(player1 + K * (w - we)), 0);
  }
}
