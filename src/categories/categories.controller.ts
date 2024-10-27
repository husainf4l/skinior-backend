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
  async findOne(@Param('handle') handle: string) {
    return this.categoriesService.findOne(handle);
  }

  @Post()
  async create(@Body() data: any) {
    return this.categoriesService.create(data);
  }

  @Patch(':id')
  async update(@Param('handle') handle: string, @Body() data: any) {
    return this.categoriesService.update(handle, data);
  }

  @Delete(':id')
  async delete(@Param('handle') handle: string) {
    return this.categoriesService.delete(handle);
  }
}
