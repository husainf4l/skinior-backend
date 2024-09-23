import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) { }

    async placeOrder(data: Prisma.OrderCreateInput): Promise<Order> {
        return this.prisma.order.create({
            data,
        });
    }

    async getOrderById(orderId: string): Promise<Order | null> {
        return this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                orderItems: true,
                user: true,

            },
        });
    }


    async getOrdersByUserId(userId: string): Promise<Order[]> {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                orderItems: true,
            },
        });
    }

}
