import { Test, TestingModule } from '@nestjs/testing';
import { PointsV2Service } from './points-v2.service';

describe('PointsV2Service', () => {
  let service: PointsV2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointsV2Service],
    }).compile();

    service = module.get<PointsV2Service>(PointsV2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
