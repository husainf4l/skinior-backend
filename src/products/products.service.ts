import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.product.findMany();
  }
  async featuredCategory(categoryId: number) {
    return this.prisma.product.findMany({
      where: {
        categoryId,
        isFeatured: true
      }
    })
  }

  async categoryProducts(categoryId: number) {
    return this.prisma.product.findMany({
      where: { categoryId },
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
        discountedPrice: true
      }

    })
  }


  async findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id }, include: { variants: true } });
  }

  async create(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data });
  }

  async update(id: number, data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
