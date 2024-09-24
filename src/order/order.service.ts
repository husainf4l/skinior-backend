// src/order/order.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  // Place a new order
  async placeOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    return this.prisma.order.create({
      data,
      include: {
        orderItems: true, // Include related data if needed
      },
    });
  }

  // Get order by ID
  async getOrderById(orderId: string): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: { include: { product: true, variant: true } }, // Include necessary relations
        user: true,
      },
    });
  }

  // Get orders by User ID
  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: { include: { product: true, variant: true } },
      },
    });
  }
}
