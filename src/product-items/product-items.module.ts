import { Module } from '@nestjs/common';
import { ProductItemsService } from './product-items.service';
import { ProductItemsController } from './product-items.controller';

@Module({
  providers: [ProductItemsService],
  controllers: [ProductItemsController]
})
export class ProductItemsModule {}
