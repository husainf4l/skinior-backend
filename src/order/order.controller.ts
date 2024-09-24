// src/order/order.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Place order
  @Post()
  async placeOrder(@Body() orderData: Prisma.OrderCreateInput): Promise<Order> {
    return this.orderService.placeOrder(orderData);
  }

  // Get order by ID
  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Order | null> {
    return this.orderService.getOrderById(id);
  }

  // Get orders by User ID
  @Get('user/:userId')
  async getOrdersByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.orderService.getOrdersByUserId(userId);
  }
}
