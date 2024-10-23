import { Test, TestingModule } from '@nestjs/testing';
import { ProductsVariantsService } from './products-variants.service';

describe('ProductsVariantsService', () => {
  let service: ProductsVariantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsVariantsService],
    }).compile();

    service = module.get<ProductsVariantsService>(ProductsVariantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
