import { Module } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { ShoppingCartsController } from './shopping-carts.controller';

@Module({
  providers: [ShoppingCartsService],
  controllers: [ShoppingCartsController]
})
export class ShoppingCartsModule {}