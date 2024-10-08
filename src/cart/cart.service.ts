// src/cart/cart.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) { }

  // Get Cart by cartId
  async getCartById(cartId: number) {
    return await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });
  }

  // Create a new cart
  async createCart(userId?: string) {
    return await this.prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  // Add Item to Cart
  async addItemToCart(
    cartId: number,
    productId: number,
    variantId?: number,
    quantity = 1,
  ) {
    // Check if the cart exists
    let cart = await this.prisma.cart.findUnique({ where: { id: cartId } });
    if (!cart) {
      // Optionally, create a new cart if it doesn't exist
      cart = await this.createCart();
    }

    const existingCartItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        variantId,
      },
    });

    if (existingCartItem) {
      return await this.prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      return await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          variantId,
          quantity,
        },
      });
    }
  }

  // Remove Item from Cart
  async removeItemFromCart(cartItemId: number) {
    return await this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }

  // Update Item Quantity
  async updateItemQuantity(cartItemId: number, quantity: number) {
    return await this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });
  }

  // Clear Cart
  async clearCart(cartId: number) {
    await this.prisma.cartItem.deleteMany({
      where: { cartId },
    });
    return { message: 'Cart cleared' };
  }
}
