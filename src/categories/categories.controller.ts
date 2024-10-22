import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.categoriesService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.categoriesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.categoriesService.delete(id);
  }
}
