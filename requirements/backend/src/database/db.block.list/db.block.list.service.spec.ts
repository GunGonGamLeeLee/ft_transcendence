import { Test, TestingModule } from '@nestjs/testing';
import { DbBlockListService } from './db.block.list.service';

describe('DbBlockListService', () => {
  let service: DbBlockListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbBlockListService],
    }).compile();

    service = module.get<DbBlockListService>(DbBlockListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
