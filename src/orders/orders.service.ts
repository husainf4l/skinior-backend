import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, OrderStatusenm } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) { }

  async createOrderFromCart(data: {
    cartId: number;
    paymentMethodId: number;
    shippingMethodId: number;
    addressId: number;
    userId?: string;
    guestInfoId?: number;
  }) {
    const cart = await this.prisma.shoppingCart.findUnique({
      where: { id: data.cartId },
      include: { items: true },
    });

    if (!cart || cart.items.length === 0) {
      throw new NotFoundException('Shopping cart is empty or not found');
    }

    const total = cart.total;

    const order = await this.prisma.order.create({
      data: {
        userId: data.userId || null,
        guestInfoId: data.guestInfoId || null,
        paymentMethodId: data.paymentMethodId,
        shippingMethodId: data.shippingMethodId,
        addressId: data.addressId,
        total,
        status: OrderStatusenm.PENDING,
        orderItems: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
          })),
        },
      },
      include: { address: true, guestInfo: true, orderItems: true },
    });

    await this.prisma.shoppingCart.delete({ where: { id: data.cartId } });

    return order;
  }

  async findAllOrders() {
    return this.prisma.order.findMany({
      include: {
        orderItems: true,
        address: true
      },
      orderBy: { id: 'desc' }
    })
  }

  async findUserOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: { orderItems: true },
    });

    if (!orders.length) {
      throw new NotFoundException('No orders found for this user');
    }

    return orders;
  }

  async getOrderById(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {

        orderItems: {
          include: {
            product: true,
            variant: true,
          },
        }, address: true,
        guestInfo: true,
      },


    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateOrderStatus(orderId: number, status: OrderStatusenm) {
    const validStatuses = ['PENDING', 'COMPLETED', 'CANCELLED'];

    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Invalid order status');
    }

    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    console.log(`Order ${orderId} status updated to ${status}`);
    return order;
  }


  async createOrderFromSessionId(sessionId: string): Promise<any> {
    // Step 1: Find the cart by session ID
    const cart = await this.prisma.shoppingCart.findUnique({
      where: { sessionsId: sessionId },
      include: { items: true, address: true },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    // You need a valid shipping method ID for the order
    const defaultShippingMethod = await this.prisma.shippingMethod.findFirst();
    if (!defaultShippingMethod) {
      throw new NotFoundException('No shipping method available');
    }

    const order = await this.prisma.order.create({
      data: {
        total: cart.total,
        status: 'PENDING',
        shippingMethod: { connect: { id: 1 } },
        address: cart.address ? { connect: { id: cart.address.id } } : undefined,
        orderItems: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
          })),
        },
      },
      include: { orderItems: true, address: true, shippingMethod: true },
    });


    await this.prisma.cartItem.deleteMany({
      where: { shoppingCartId: cart.id },
    });

    await this.prisma.shoppingCart.delete({
      where: { id: cart.id },
    });

    return order;
  }

  async updateOrderById(id: number, data: Prisma.OrderUpdateInput) {
    return this.prisma.order.update({ where: { id }, data });
  }



}
