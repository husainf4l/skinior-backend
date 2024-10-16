// src/order/order.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async createOrder(orderData: any) {
    const {
      cartId,
      userId, // Optional for authenticated users
      phoneNumber,
      shippingAddress,
      shippingCity,
      shippingCountry,
    } = orderData;

    // Validate required fields
    if (!phoneNumber || !shippingAddress || !shippingCity) {
      throw new BadRequestException('Missing required fields');
    }

    // Get cart by cartId
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new NotFoundException('Cart is empty or does not exist');
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce((total: number, item) => {
      const price: number = item.variant ? item.variant.price : item.product.price;
      const quantity = item.quantity; // No need for Decimal conversion, quantity is a number now
      const itemTotal = price * quantity; // Simply multiply numbers
      return total + itemTotal; // Add to total
    }, 0);
    // Build the data object
    const orderDataInput: Prisma.OrderCreateInput = {
      totalAmount,
      phoneNumber,
      shippingAddress,
      shippingCity,
      shippingCountry,
      orderItems: {
        create: cart.items.map((item) => ({
          product: { connect: { id: item.productId } },
          variant: item.variantId ? { connect: { id: item.variantId } } : undefined,
          quantity: item.quantity,
          price: item.variant ? item.variant.price : item.product.price,
        })),
      },
    };

    // If userId is provided, connect the user
    if (userId) {
      orderDataInput.user = { connect: { id: userId } };
    }

    // Create order
    const order = await this.prisma.order.create({
      data: orderDataInput,
      include: {
        orderItems: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    // Clear the cart
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return order;
  }



  // Get Orders by User ID (Authenticated users)
  async getOrdersByUserId(userId: string) {
    return await this.prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Get Order by Order ID (For guest users to check their order status)
  async getOrderById(orderId: string, customerEmail: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }



    return order;
  }

  // Update Order Status (Admin functionality)
  async updateOrderStatus(orderId: string, status: OrderStatus) {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    return order;
  }
}
