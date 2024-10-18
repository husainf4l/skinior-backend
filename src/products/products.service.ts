// src/products/products.service.ts

import { Injectable } from '@nestjs/common';
import { Category, Product } from '@prisma/client';
import { ProductList } from '../module/interfaces.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  // Get all products
  async getAllProducts(): Promise<ProductList[]> {
    return this.prisma.product.findMany({
      select: {
        barcode: true,
        id: true,
        name: true,
        price: true,
        categoryId: true,
        isFeatured: true,
        images: true
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
        images: true,
        category: true,
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
  async getFeaturedProductsByCategory(categoryId: number): Promise<ProductList[]> {
    return this.prisma.product.findMany({
      select: {
        barcode: true,
        id: true,
        name: true,
        price: true,
        categoryId: true,
        isFeatured: true,
        images: true,
      },
      where: {
        isFeatured: true,
        categoryId: categoryId,
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

  async updateProduct(id: number, data: any): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: {
        ...data,
        images: {
          deleteMany: {}, // Optionally delete old images
          create: data.images.map((image) => ({
            url: image.url,
            altText: image.altText,
          })),
        },
        reviews: {
          upsert: data.reviews.map((review) => ({
            where: { id: review.id },
            update: { ...review },
            create: { ...review },
          })),
        },
        variants: {
          // Example: Handle variants similarly to reviews
        },
      },
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
