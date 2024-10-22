import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductItemsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.productItem.findMany({ include: { product: true } });
  }

  async findOne(id: number) {
    return this.prisma.productItem.findUnique({ where: { id }, include: { product: true } });
  }

  async create(data: any) {
    return this.prisma.productItem.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.productItem.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.productItem.delete({ where: { id } });
  }
}
