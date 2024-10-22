import { Test, TestingModule } from '@nestjs/testing';
import { ProductItemsController } from './product-items.controller';

describe('ProductItemsController', () => {
  let controller: ProductItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductItemsController],
    }).compile();

    controller = module.get<ProductItemsController>(ProductItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
