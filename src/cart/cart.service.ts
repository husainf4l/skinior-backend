// src/cart/cart.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cart, Prisma } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  // Add item to cart
  async addToCart(
    userId: string | null,
    productId: number,
    quantity: number,
    variantId?: number
  ) {
    if (userId) {
      // Handle logged-in user
      return this.prisma.cartItem.create({
        data: {
          quantity,
          product: {
            connect: { id: productId }, // Connect to an existing product
          },
          variant: variantId
            ? {
                connect: { id: variantId }, // Connect to an existing variant if provided
              }
            : undefined,
          cart: {
            connectOrCreate: {
              where: { userId }, // Connect to the user's cart if exists
              create: { userId }, // Create a new cart for the user if not exists
            },
          },
        },
      });
    } else {
      // Handle guest user (alternative approach)
      return this.handleGuestCart(productId, quantity, variantId);
    }
  }
  
  // Alternative method for handling guest cart (session-based or any other strategy)
  private async handleGuestCart(productId: number, quantity: number, variantId?: number) {
    return this.prisma.cartItem.create({
      data: {
        quantity,
        product: {
          connect: { id: productId }, // Connect to an existing product
        },
        variant: variantId
          ? {
              connect: { id: variantId }, // Connect to an existing variant if provided
            }
          : undefined,
        cart: {
          create: {}, // Create a cart for guest users without userId
        },
      },
    });
  }
  

  // Get cart by userId
  async getCart(userId: string | null): Promise<Cart | null> {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true, variant: true },
        },
      },
    });
  }

  // Remove item from cart
  async removeFromCart(cartItemId: number): Promise<void> {
    await this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }

  // Clear cart by userId
  async clearCart(userId: string | null): Promise<Cart | null> {
    return this.prisma.cart.update({
      where: { userId },
      data: {
        items: { deleteMany: {} },
      },
    });
  }
}
