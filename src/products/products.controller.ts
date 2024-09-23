import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    return this.productsService.getProductById(+id);
  }

  @Post()
  async createProduct(@Body() data: any): Promise<Product> {
    return this.productsService.createProduct(data);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() data: any): Promise<Product> {
    return this.productsService.updateProduct(+id, data);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<Product> {
    return this.productsService.deleteProduct(+id);
  }
}
