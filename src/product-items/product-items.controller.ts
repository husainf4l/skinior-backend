import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { ProductItemsService } from './product-items.service';

@Controller('product-items')
export class ProductItemsController {
  constructor(private readonly productItemsService: ProductItemsService) {}

  @Get()
  async findAll() {
    return this.productItemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productItemsService.findOne(+id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.productItemsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.productItemsService.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.productItemsService.delete(+id);
  }
}
