import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class AuthorizedPosService {
    constructor(private prisma: PrismaService) { }

    async getAuthorizedPointsOfSale(skip: number = 0, take: number = 10, search: string = '') {
        const where: Prisma.AuthorizedPointOfSaleWhereInput = search
            ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { category: { contains: search, mode: 'insensitive' } },
                    { location: { contains: search, mode: 'insensitive' } },
                ],
            }
            : {};

        return this.prisma.authorizedPointOfSale.findMany({
            where,
            skip,
            take,
        });
    }

    async getTotalCount(search: string = '') {
        const where: Prisma.AuthorizedPointOfSaleWhereInput = search
            ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { category: { contains: search, mode: 'insensitive' } },
                    { location: { contains: search, mode: 'insensitive' } },
                ],
            }
            : {};

        return this.prisma.authorizedPointOfSale.count({ where });
    }

    async createAuthorizedPointOfSale(data: Prisma.AuthorizedPointOfSaleCreateInput) {
        return this.prisma.authorizedPointOfSale.create({
            data,
        });
    }

    async getAll() {
        return this.prisma.authorizedPointOfSale.findMany()
    }

    // Add this method
    async deleteAuthorizedPointOfSale(id: string) {
        return this.prisma.authorizedPointOfSale.delete({
            where: { id },
        });
    }

    // Optionally, you can add an update method as well
    async updateAuthorizedPointOfSale(id: string, data: Prisma.AuthorizedPointOfSaleUpdateInput) {
        return this.prisma.authorizedPointOfSale.update({
            where: { id },
            data,
        });
    }

    async getAuthorizedPointOfSaleById(id: string) {
        const authorizedPos = await this.prisma.authorizedPointOfSale.findUnique({
            where: { id },
        });

        if (!authorizedPos) {
            throw new NotFoundException('Authorized Point of Sale not found');
        }

        return authorizedPos;
    }

}
