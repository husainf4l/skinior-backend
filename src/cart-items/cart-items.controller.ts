import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { Prisma } from '@prisma/client';

@Controller('cart-items')
export class CartItemsController {
    constructor(private readonly cartItemsService: CartItemsService) {}

  @Get()
  async findAll() {
    return this.cartItemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.cartItemsService.findOne(+id);
  }

  @Post()
  async create(@Body() data: Prisma.CartItemUncheckedCreateInput) {
    return this.cartItemsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.cartItemsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.cartItemsService.delete(id);
  }
}
