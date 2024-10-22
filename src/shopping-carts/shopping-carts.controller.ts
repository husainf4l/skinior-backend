import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';

@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor(private readonly shoppingCartsService: ShoppingCartsService) {}

  @Get()
  async findAll() {
    return this.shoppingCartsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.shoppingCartsService.findOne(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.shoppingCartsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.shoppingCartsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.shoppingCartsService.delete(id);
  }
}
