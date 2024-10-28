import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.product.findMany();
  }
  async featuredCategory(categoryHandle: string) {
    return this.prisma.product.findMany({
      where: {
        categoryHandle,
        isFeatured: true
      }
    })
  }

  async productsByBrands(brand: string) {
    return this.prisma.product.findMany({
      where: {
        brand,
      }
    })
  }

  async productsByPrice(price: number) {
    return this.prisma.product.findMany({
      where: {
        discountedPrice: {
          lt: price,
        },
      },
    });
  }

  
  async categoryProducts(categoryHandle: string) {
    return this.prisma.product.findMany({
      where: { categoryHandle },
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
        handle:true,
        discountedPrice: true
      }

    })
  }


  async findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id }, include: { variants: true } });
  }

  async findOneHandle(handle: string) {
    return this.prisma.product.findUnique({ where: { handle }, include: { variants: true } });
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


    // Top-Selling Products with Aggregation
    async getTopSellingProducts(limit: number) {
      const topProducts = await this.prisma.orderItem.groupBy({
        by: ['productId'],
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: limit,
      });
  
      const productIds = topProducts.map((item) => item.productId);
  
      return this.prisma.product.findMany({
        where: { id: { in: productIds } },
        include: {
          category: true,
          variants: true,
        },
      });
    }
}
