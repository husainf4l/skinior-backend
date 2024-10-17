import { Test, TestingModule } from '@nestjs/testing';
import { OrderCartController } from './order-cart.controller';

describe('OrderCartController', () => {
  let controller: OrderCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderCartController],
    }).compile();

    controller = module.get<OrderCartController>(OrderCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
