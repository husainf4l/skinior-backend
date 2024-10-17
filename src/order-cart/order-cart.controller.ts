import { Controller, Post, Get, Body, Param, Delete, Query } from '@nestjs/common';
import { OrderCartService } from './order-cart.service';
import { Prisma, Order } from '@prisma/client';

@Controller('order-cart')
export class OrderCartController {
  constructor(private readonly orderCartService: OrderCartService) {}

  // ---------------- CART ENDPOINTS ---------------- //

  // Add item to cart
  @Post('add')
  async addToCart(
    @Body('userId') userId: string | null,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
    @Body('variantId') variantId?: number
  ) {
    return this.orderCartService.addToCart(userId, productId, quantity, variantId);
  }

  // Get cart details by userId or sessionId
  @Get()
  async getCart(@Query('userId') userId: string | null, @Query('sessionId') sessionId: string | null) {
    return this.orderCartService.getCart(userId, sessionId);
  }

  // Remove item from cart by cartItemId
  @Delete('remove/:cartItemId')
  async removeFromCart(@Param('cartItemId') cartItemId: number, @Query('userId') userId: string | null, @Query('sessionId') sessionId: string | null) {
    return this.orderCartService.removeFromCart(cartItemId, userId, sessionId);
  }

  // Clear cart for a specific user or session
  @Delete('clear')
  async clearCart(@Query('userId') userId: string | null, @Query('sessionId') sessionId: string | null) {
    return this.orderCartService.clearCart(userId, sessionId);
  }

  // ---------------- ORDER ENDPOINTS ---------------- //

  // Place order
  @Post('order')
  async placeOrder(
    @Body('userId') userId: string | null,
    @Body() orderData: Prisma.OrderCreateInput
  ): Promise<Order> {
    return this.orderCartService.placeOrder(userId, orderData);
  }

  // Get order by ID
  @Get('order/:id')
  async getOrderById(@Param('id') id: string): Promise<Order | null> {
    return this.orderCartService.getOrderById(id);
  }

  // Get orders by User ID
  @Get('orders/user/:userId')
  async getOrdersByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.orderCartService.getOrdersByUserId(userId);
  }
}
