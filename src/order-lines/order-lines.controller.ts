import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { OrderLinesService } from './order-lines.service';

@Controller('order-lines')
export class OrderLinesController {
  constructor(private readonly orderLinesService: OrderLinesService) {}

  @Get()
  async findAll() {
    return this.orderLinesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.orderLinesService.findOne(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.orderLinesService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.orderLinesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.orderLinesService.delete(id);
  }
}
