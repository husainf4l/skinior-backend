import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Category, Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get("categories")
  async getAllCategory(): Promise<Category[]> {
    return this.productsService.getAllCategory();
  }

  @Get("featured")
  async getFeaturedProducts(): Promise<Product[]> {
    return this.productsService.getFeaturedProducts();
  }


  @Post('categories')
  async createCategory(@Body() data: any): Promise<Category> {
    return this.productsService.createCategory(data);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    return this.productsService.getProductById(+id);
  }

  @Post('create')
  async createProduct(@Body() data: any): Promise<Product> {
    console.log('Request Data:', data);

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
