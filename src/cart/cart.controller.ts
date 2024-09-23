// src/cart/cart.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { Prisma } from '@prisma/client';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    // Add product to cart
    @Post('add')
    async addToCart(
        @Body('userId') userId: string | null, // Optional userId, can be null if guest
        @Body('productId') productId: number,
        @Body('quantity') quantity: number,
        @Body('variantId') variantId?: number,
    ) {
        return this.cartService.addToCart(userId, productId, quantity, variantId);
    }

    // Get the cart details
    @Get()
    async getCart(@Query('userId') userId: string | null) {
        return this.cartService.getCart(userId);
    }

    // Remove item from cart
    @Delete('remove/:cartItemId')
    async removeFromCart(@Param('cartItemId') cartItemId: number) {
        return this.cartService.removeFromCart(cartItemId);
    }

    // Clear the cart
    @Delete('clear')
    async clearCart(@Body('userId') userId: string | null) {
        return this.cartService.clearCart(userId);
    }
}
