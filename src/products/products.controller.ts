import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('featured/:categoryId')
  async featuredCategory(@Param('categoryId') categoryId:number){
    return this.productsService.featuredCategory(+categoryId);
  }

  @Get('category/:categoryId')
  async categoriesProducts(@Param('categoryId') categoryId:number){
    return this.productsService.categoryProducts(+categoryId)
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }


  @Post()
  async create(@Body() data: any) {
    return this.productsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.productsService.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.productsService.delete(+id);
  }
}
