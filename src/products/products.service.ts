import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ensure PrismaService is imported correctly
import { Product } from '@prisma/client'; // Import your Prisma Product model

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  // Fetch all products
  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  // Fetch a single product by id
  async getProductById(id: number): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // Create a new product
  async createProduct(data: any): Promise<Product> {
    return this.prisma.product.create({
      data,
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
}
