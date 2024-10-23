import { Test, TestingModule } from '@nestjs/testing';
import { ProductsVariantsController } from './products-variants.controller';

describe('ProductsVariantsController', () => {
  let controller: ProductsVariantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsVariantsController],
    }).compile();

    controller = module.get<ProductsVariantsController>(ProductsVariantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
