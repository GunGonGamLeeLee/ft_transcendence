import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MatchHistoryDto } from 'src/database/dto/match.history.dto';

const K = 10; // Elo 가중치

@Injectable()
export class GameResultService {
  constructor(private readonly database: DatabaseService) {}
  async saveResult(gameResult: MatchHistoryDto) {
    await this.database.addMatchHistory(gameResult); // TODO transaction
    if (gameResult.isRank) {
      await this.updateRating(gameResult);
    }
  }

  async updateRating(gameResult: MatchHistoryDto) {
    const winner = await this.database.findOneUser(gameResult.winnerUid);
    const loser = await this.database.findOneUser(gameResult.loserUid);

    winner.rating = this.calcRating(winner.rating, loser.rating, true);
    loser.rating = this.calcRating(loser.rating, winner.rating, false);

    console.log(
      `game.result.service: updateRating: winner.rating ${winner.rating}`,
    );
    console.log(
      `game.result.service: updateRating: loser.rating ${loser.rating}`,
    );

    await this.database.updateUserRating(winner.uid, winner.rating); // TODO transaction depth?
    await this.database.updateUserRating(loser.uid, loser.rating);
  }

  calcRating(player1: number, player2: number, isWin: boolean): number {
    const we = 1 / (Math.pow(10, (player2 - player1) / 400) + 1);
    const w = isWin ? 1 : 0;
    return Math.floor(player1 + K * (w - we));
  }
}
