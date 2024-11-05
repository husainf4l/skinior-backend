import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizedPosController } from './authorized-pos.controller';

describe('AuthorizedPosController', () => {
  let controller: AuthorizedPosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorizedPosController],
    }).compile();

    controller = module.get<AuthorizedPosController>(AuthorizedPosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
