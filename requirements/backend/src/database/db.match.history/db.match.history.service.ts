import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchHistoryDto } from '../dto/match.history.dto';
import { MatchHistoryEntity } from '../entity/entity.matchhistory.list';
import { UserEntity } from '../entity/entity.user';

@Injectable()
export class DbMatchHistoryService {
  constructor(
    @InjectRepository(MatchHistoryEntity)
    private matchHistoryRepo: Repository<MatchHistoryEntity>,
  ) {}

  async findAll() {
    return await this.matchHistoryRepo.find();
  }

  async findAllListOfUser(uid: number) {
    return await this.matchHistoryRepo.find({
      select: {
        index: true,
        winnerUid: true,
        loserUid: true,
        isRank: true,
      },
      where: [{ winnerUid: uid }, { loserUid: uid }],
      order: {
        index: 'desc',
      },
    });
  }

  async findListOfUser(uid: number, take: number, page: number) {
    return await this.matchHistoryRepo.find({
      select: {
        index: true,
        winnerUid: true,
        loserUid: true,
        isRank: true,
      },
      where: [{ winnerUid: uid }, { loserUid: uid }],
      order: {
        index: 'desc',
      },
      skip: (page - 1) * take, // index 1부터 시작
      take: take,
    });
  }

  async findAllListOfUserWithInfo(uid: number) {
    return await this.matchHistoryRepo.find({
      select: {
        index: true,
        winner: {
          uid: true,
          displayName: true,
          imgUri: true,
        },
        loser: {
          uid: true,
          displayName: true,
          imgUri: true,
        },
        isRank: true,
      },
      relations: {
        winner: true,
        loser: true,
      },
      where: [{ winnerUid: uid }, { loserUid: uid }],
      order: {
        index: 'desc',
      },
    });
  }

  async findListOfUserWithInfo(uid: number, take: number, page: number) {
    return await this.matchHistoryRepo.find({
      select: {
        index: true,
        winner: {
          uid: true,
          displayName: true,
          imgUri: true,
        },
        loser: {
          uid: true,
          displayName: true,
          imgUri: true,
        },
        isRank: true,
      },
      relations: {
        winner: true,
        loser: true,
      },
      where: [{ winnerUid: uid }, { loserUid: uid }],
      order: {
        index: 'desc',
      },
      skip: (page - 1) * take,
      take: take,
    });
  }

  async saveOne(
    matchHistory: MatchHistoryDto | MatchHistoryEntity,
    winner: UserEntity,
    loser: UserEntity,
  ) {
    const history = this.matchHistoryRepo.create({
      ...matchHistory,
      winner,
      loser,
    });
    try {
      await this.matchHistoryRepo.save(history);
    } catch (err) {
      throw new HttpException('invalid game history', HttpStatus.FORBIDDEN);
    }
  }

  async deleteAll() {
    return await this.matchHistoryRepo.clear();
  }

  async deleteUserAll(uid: number) {
    await this.matchHistoryRepo.delete({ winnerUid: uid });
    await this.matchHistoryRepo.delete({ loserUid: uid });
  }
}
