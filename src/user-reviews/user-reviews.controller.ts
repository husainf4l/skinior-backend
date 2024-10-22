import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserReviewsService } from './user-reviews.service';

@Controller('user-reviews')
export class UserReviewsController {
  constructor(private readonly userReviewsService: UserReviewsService) {}

  @Get()
  async findAll() {
    return this.userReviewsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userReviewsService.findOne(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.userReviewsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.userReviewsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userReviewsService.delete(id);
  }
}
