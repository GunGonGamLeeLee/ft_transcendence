import { Test, TestingModule } from '@nestjs/testing';
import { DbFriendListService } from './db.friend.list.service';

describe('DbFriendListService', () => {
  let service: DbFriendListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbFriendListService],
    }).compile();

    service = module.get<DbFriendListService>(DbFriendListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
