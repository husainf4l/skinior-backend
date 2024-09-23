// src/order/order.controller.ts
import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order, Prisma } from '@prisma/client';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    async placeOrder(@Body() orderData: any): Promise<Order> {
        return this.orderService.placeOrder(orderData);
    }

    @Get(':id')
    async getOrderById(@Param('id') id: string) {
        return this.orderService.getOrderById(id);
    }

    @Get('user/:userId')
    async getOrdersByUserId(@Param('userId') userId: string) {
        return this.orderService.getOrdersByUserId(userId);
    }
}
