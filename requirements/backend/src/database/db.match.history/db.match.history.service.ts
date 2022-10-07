// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { RelationListDto } from '../dto/relation.list.dto';
// import { MatchHistoryEntity } from '../entity/entity.matchhistory.list';

// @Injectable()
// export class DbMatchHistoryService {
//   constructor(
//     @InjectRepository(MatchHistoryEntity)
//     private matchHistoryRepo: Repository<MatchHistoryEntity>,
//   ) {}

//   async findAll() {
//     return await this.matchHistoryRepo.find();
//   }

//   async saveOne(
//     matchHistory: RelationListDto, //p1, p2를 RelationListDto를 쓰기위해 f, t
//   ): Promise<void> {
//     const his = new MatchHistoryEntity();
//     his.player1uid = matchHistory.fromUid;
//     his.player2uid = matchHistory.toUid;
//     await this.matchHistoryRepo.save(his);
//   }
// }
