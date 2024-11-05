import { Controller, Get, Query, Post, Body, Delete, Param } from '@nestjs/common';
import { AuthorizedPosService } from './authorized-pos.service';
import { Prisma } from '@prisma/client';

@Controller('authorized-pos')
export class AuthorizedPosController {
    constructor(private readonly authorizedPosService: AuthorizedPosService) { }


    @Get()
    async getAuthorizedPointsOfSale(
        @Query('page') page: string,
        @Query('limit') limit: string,
        @Query('search') search: string,
    ) {
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * pageSize;

        const items = await this.authorizedPosService.getAuthorizedPointsOfSale(skip, pageSize, search);
        const totalItems = await this.authorizedPosService.getTotalCount(search);

        return { items, totalItems };
    }

    @Get('all')
    async getAll() {
        return this.authorizedPosService.getAll();
    }

    @Get(':id')
    async getAuthorizedPointOfSaleById(@Param('id') id: string) {
        return this.authorizedPosService.getAuthorizedPointOfSaleById(id);
    }


    @Post()
    async createAuthorizedPointOfSale(@Body() data: Prisma.AuthorizedPointOfSaleCreateInput) {
        return this.authorizedPosService.createAuthorizedPointOfSale(data);
    }

    // Add this method
    @Delete(':id')
    async deleteAuthorizedPointOfSale(@Param('id') id: string) {
        return this.authorizedPosService.deleteAuthorizedPointOfSale(id);
    }

    // Optionally, you can add an update endpoint as well
    @Post(':id')
    async updateAuthorizedPointOfSale(@Param('id') id: string, @Body() data: Prisma.AuthorizedPointOfSaleUpdateInput) {
        return this.authorizedPosService.updateAuthorizedPointOfSale(id, data);
    }
}
