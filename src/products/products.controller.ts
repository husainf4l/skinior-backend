// src/products/products.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Category, Product } from '@prisma/client';
import { ProductList } from '../module/interfaces.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get('categories')
  async getAllCategory(): Promise<Category[]> {
    return this.productsService.getAllCategory();
  }

  @Get('category/:categoryId')
  async getProductsByCategoryId(@Param('categoryId') categoryId: number): Promise<Product[]> {
    return this.productsService.getProductsByCategoryId(+categoryId);
  }


  @Get('featured/:categoryId')
  async getFeaturedProductsByCategory(@Param(`categoryId`) categoryId: number): Promise<ProductList[]> {
    return this.productsService.getFeaturedProductsByCategory(+categoryId);
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    return this.productsService.getProductById(+id);
  }

  @Get()
  async getAllProducts(): Promise<ProductList[]> {
    return this.productsService.getAllProducts();
  }

  @Post('create')
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
