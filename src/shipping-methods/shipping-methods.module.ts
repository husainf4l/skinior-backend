import { Module } from '@nestjs/common';
import { ShippingMethodsService } from './shipping-methods.service';
import { ShippingMethodsController } from './shipping-methods.controller';

@Module({
  providers: [ShippingMethodsService],
  controllers: [ShippingMethodsController]
})
export class ShippingMethodsModule {}
