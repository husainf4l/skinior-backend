// src/cart/cart.controller.ts
import { Controller, Post, Get, Body, Param, Delete, Query } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Add item to cart
  @Post('add')
  async addToCart(
    @Body('userId') userId: string | null,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
    @Body('variantId') variantId?: number
  ) {
    return this.cartService.addToCart(userId, productId, quantity, variantId);
  }

  // Get cart details by userId
  @Get()
  async getCart(@Query('userId') userId: string | null) {
    return this.cartService.getCart(userId);
  }

  // Remove item from cart by cartItemId
  @Delete('remove/:cartItemId')
  async removeFromCart(@Param('cartItemId') cartItemId: number) {
    return this.cartService.removeFromCart(cartItemId);
  }

  // Clear cart for a specific user
  @Delete('clear')
  async clearCart(@Body('userId') userId: string | null) {
    return this.cartService.clearCart(userId);
  }
}
