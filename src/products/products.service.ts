// src/products/products.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category, Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  // Get all products
  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        images: true, // Include related images
      },
    });
  }

  // Get products by category ID
  async getProductsByCategoryId(categoryId: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        categoryId,
      },
      include: {
        images: true, // Include related images
      },
    });
  }

  // Get all categories
  async getAllCategory(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  // Get featured products
  async getFeaturedProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        isFeatured: true,
      },
      include: {
        images: true, // Include related images
      },
    });
  }

  // Get product by ID
  async getProductById(id: number): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        images: true, // Include related images
        reviews: true, // Include related reviews
        variants: true, // Include variants
      },
    });
  }

  // Create product
  async createProduct(data: any): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  // Update product
  async updateProduct(id: number, data: any): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  // Delete product
  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  // Create a new category
  async createCategory(data: any): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }
}
