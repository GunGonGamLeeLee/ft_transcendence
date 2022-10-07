import { Test, TestingModule } from '@nestjs/testing';
import { DbUserService } from './db.user.service';

describe('DbUserService', () => {
  let service: DbUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbUserService],
    }).compile();

    service = module.get<DbUserService>(DbUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
