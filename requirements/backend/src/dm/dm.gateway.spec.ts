import { Test, TestingModule } from '@nestjs/testing';
import { DmGateway } from './dm.gateway';

describe('DmGateway', () => {
  let gateway: DmGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DmGateway],
    }).compile();

    gateway = module.get<DmGateway>(DmGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
