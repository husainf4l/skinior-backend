// src/cart/cart.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  // Get Cart
  @Get()
  async getCart(@Query('cartId') cartId: number) {
    if (!cartId) {
      // Optionally, create a new cart if cartId is not provided
      const newCart = await this.cartService.createCart();
      return newCart;
    }
    return await this.cartService.getCartById(Number(cartId));
  }

  // Add Item to Cart
  @Post('add')
  async addItem(
    @Body('cartId') cartId: number,
    @Body('productId') productId: number,
    @Body('variantId') variantId: number,
    @Body('quantity') quantity: number,
  ) {
    if (!cartId) {
      // Create a new cart
      const newCart = await this.cartService.createCart();
      cartId = newCart.id;
    }
    const item = await this.cartService.addItemToCart(
      cartId,
      productId,
      variantId,
      quantity,
    );
    return { cartId, item };
  }

  // Remove Item from Cart
  @Delete('remove/:cartItemId')
  async removeItem(@Param('cartItemId') cartItemId: number) {
    return await this.cartService.removeItemFromCart(cartItemId);
  }

  // Update Item Quantity
  @Put('update/:cartItemId')
  async updateItem(
    @Param('cartItemId') cartItemId: number,
    @Body('quantity') quantity: number,
  ) {
    return await this.cartService.updateItemQuantity(cartItemId, quantity);
  }

  // Clear Cart
  @Delete('clear')
  async clearCart(@Body('cartId') cartId: number) {
    return await this.cartService.clearCart(cartId);
  }

  @Post()
  async createCart() {
    const newCart = await this.cartService.createCart();
    return newCart;
  }

}
