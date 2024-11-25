import { Test, TestingModule } from '@nestjs/testing';
import { PointsV2Controller } from './points-v2.controller';

describe('PointsV2Controller', () => {
  let controller: PointsV2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointsV2Controller],
    }).compile();

    controller = module.get<PointsV2Controller>(PointsV2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
