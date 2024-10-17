import { Test, TestingModule } from '@nestjs/testing';
import { OrderCartService } from './order-cart.service';

describe('OrderCartService', () => {
  let service: OrderCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderCartService],
    }).compile();

    service = module.get<OrderCartService>(OrderCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
