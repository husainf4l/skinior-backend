import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ProductsService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: CacheStore, private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async featuredCategory(categoryHandle: string): Promise<any[]> {
    const cacheKey = `featured_category_${categoryHandle}`;

    // Check cache for existing data
    const cachedProducts = await this.cacheManager.get<Product[]>(cacheKey);
    if (cachedProducts) {
      console.log(`Returning cached products for category: ${categoryHandle}`);
      return cachedProducts;
    }

    // Fetch from database if not cached
    const products = await this.prisma.product.findMany({
      where: { categoryHandle, isFeatured: true },
      select: {
        name: true,
        shortName:true,
        line:true,
        image: true,
        price: true,
        brand: true,
        handle: true,
        discountedPrice: true,
      },
    });

    // Cache the results
    await this.cacheManager.set(cacheKey, products, { ttl: 300 });
    return products;
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

  async searchProducts(query: string,): Promise<Product[]> {
    if (!query) {
      return [];
    }
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            metaKeywords: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }





  async categoryProducts(categoryHandle: string): Promise<any[]> {
    const cacheKey = `category_products_${categoryHandle}`;

    const cachedProducts: Product[] = await this.cacheManager.get(cacheKey);
    if (cachedProducts) {
      console.log(`Returning cached products for category: ${categoryHandle}`);
      return cachedProducts;
    }

    const products = await this.prisma.product.findMany({
      where: { categoryHandle },
      select: {
        name: true,
        image: true,
        shortName:true,
        line:true,
        price: true,
        brand: true,
        handle: true,
        discountedPrice: true,
      },
    });

    await this.cacheManager.set(cacheKey, products, { ttl: 300 });
    return products;
  }


  async findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id }, 
      include: { 
      variants:{orderBy:{id:"asc"}} 
      } });
  }

  async findOneHandle(handle: string) {
    return this.prisma.product.findUnique({ where: { handle }, include: { variants:{orderBy:{id:"asc"}}  } });
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
        variants:{orderBy:{id:"asc"}} 
      },
    });
  }



  async clearAllCache(): Promise<void> {
    const cache = this.cacheManager as any;
    if (cache.reset) {
      await cache.reset();
      console.log('All cache cleared');
    } else {
      console.warn('Cache store does not support reset operation');
    }
  }

}
