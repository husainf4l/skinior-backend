import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizedPosService } from './authorized-pos.service';

describe('AuthorizedPosService', () => {
  let service: AuthorizedPosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorizedPosService],
    }).compile();

    service = module.get<AuthorizedPosService>(AuthorizedPosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
