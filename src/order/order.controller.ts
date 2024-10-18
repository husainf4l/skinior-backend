// src/order/order.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Req,
  UseGuards,
  Query,
  ParseUUIDPipe,
  ParseEnumPipe,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Request } from 'express';
import { Role, OrderStatus } from '@prisma/client';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async createOrder(@Body() orderData: any) {
    return this.orderService.createOrder(orderData);
  }

  @Get()
  async getOrders() {
    return await this.orderService.getOrders();
  }

  @Get(`userId`)
  async getUserOrders(@Req() req: Request) {
    const userId = req.user['id'];
    return await this.orderService.getOrdersByUserId(userId);
  }

  // Get Order by ID (For guests to check their order status)
  @Get(':orderId')
  async getOrderById(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Query('customerEmail') customerEmail: string,
    @Req() req: Request,
  ) {
    if (req.user) {
      // Authenticated user
      const userId = req.user['id'];
      const order = await this.orderService.getOrdersByUserId(userId);
      const foundOrder = order.find((o) => o.id === orderId);
      if (!foundOrder) {
        throw new NotFoundException('Order not found');
      }
      return foundOrder;
    } else {
      // Guest user, verify email
      return await this.orderService.getOrderById(orderId, customerEmail);
    }
  }


}
