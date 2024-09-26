// src/cart/cart.controller.ts
import { Controller, Post, Get, Body, Param, Delete, Query } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

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

  // Get cart details by userId or sessionId
  @Get()
  async getCart(@Query('userId') userId: string | null, @Query('sessionId') sessionId: string | null) {
    return this.cartService.getCart(userId, sessionId);
  }

  // Remove item from cart by cartItemId
  @Delete('remove/:cartItemId')
  async removeFromCart(@Param('cartItemId') cartItemId: number, @Query('userId') userId: string | null, @Query('sessionId') sessionId: string | null) {
    return this.cartService.removeFromCart(cartItemId, userId, sessionId);
  }

  // Clear cart for a specific user or session
  @Delete('clear')
  async clearCart(@Query('userId') userId: string | null, @Query('sessionId') sessionId: string | null) {
    return this.cartService.clearCart(userId, sessionId);
  }
}
