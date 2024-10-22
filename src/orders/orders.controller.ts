import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.ordersService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.ordersService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.ordersService.delete(id);
  }
}
