import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ensure PrismaService is imported correctly
import { Category, Product } from '@prisma/client'; // Import your Prisma Product model

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  // Fetch all products
  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany(

      {
        include: {
          category: true,
          images: true,
          variants: true,
        },
      }
    );
  }

  // Fetch a single product by id
  async getProductById(id: number): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        category: true,
        variants: true
      }
    });
  }

  // Create a new product
  async createProduct(data: any): Promise<Product> {
    return this.prisma.product.create({
      data
    });
  }

  // Update a product
  async updateProduct(id: number, data: any): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  // Delete a product
  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async createCategory(data: any): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }

  async getAllCategory(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { isFeatured: true },
      include: {
        category: true,
        images: true,
        variants: true,
      },
    });
  }


}
