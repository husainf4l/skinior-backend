import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { ShippingMethodsService } from './shipping-methods.service';

@Controller('shipping-methods')
export class ShippingMethodsController {
  constructor(private readonly shippingMethodsService: ShippingMethodsService) {}

  @Get()
  async findAll() {
    return this.shippingMethodsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.shippingMethodsService.findOne(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.shippingMethodsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.shippingMethodsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.shippingMethodsService.delete(id);
  }
}
