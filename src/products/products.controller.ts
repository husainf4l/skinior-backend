import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma, Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('featured/:categoryHandle')
  async featuredCategory(@Param('categoryHandle') categoryHandle:string){
    return this.productsService.featuredCategory(categoryHandle);
  }

  @Get('category/:categoryHandle')
  async categoriesProducts(@Param('categoryHandle') categoryHandle:string){
    return this.productsService.categoryProducts(categoryHandle)
  }

  @Get('/handle/:handle')
  async findOneHandel(@Param('handle') handle: string) {
    return this.productsService.findOneHandle(handle);
  }
  @Get('/brand/:brand')
  async productsByBrands(@Param('brand') brand: string) {
    return this.productsService.productsByBrands(brand);
  }
  @Get('/less/:price')
  async productByPrice(@Param('price') price: number) {
    return this.productsService.productsByPrice(+price);
  }
  @Get('search')
  async searchProducts(@Query('query') query: string): Promise<Product[]> {
    return this.productsService.searchProducts(query);
  }

  @Get('top-selling')
  async getTopSellingProducts(){
    return this.productsService.getTopSellingProducts(10)
  }
  
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }


  @Post()
  async create(@Body() data: Prisma.ProductCreateInput) {
    return this.productsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: Prisma.ProductUpdateInput) {
    return this.productsService.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.productsService.delete(+id);
  }

  
}
