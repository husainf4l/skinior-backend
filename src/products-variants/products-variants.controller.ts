import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsVariantsService } from './products-variants.service';

@Controller('products-variants')
export class ProductsVariantsController {

    constructor(private readonly ProductsVariantsService: ProductsVariantsService) {}

    
  @Get()
  async findAll() {
    return this.ProductsVariantsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.ProductsVariantsService.findOne(+id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.ProductsVariantsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.ProductsVariantsService.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.ProductsVariantsService.delete(+id);
  }
}
