import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsVariantsService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
      return this.prisma.variant.findMany({ include: { product: true } });
    }
  
    async findOne(id: number) {
      return this.prisma.variant.findUnique({ where: { id }, include: { product: true } });
    }
  
    async create(data: any) {
      return this.prisma.variant.create({ data:{productId:+data.productId,name:data.name,image:data.image, sku:data.sku } });
    }
  
    async update(id: number, data: any) {
      return this.prisma.variant.update({ where: { id }, data });
    }
  
    async delete(id: number) {
      return this.prisma.variant.delete({ where: { id } });
    }
}
