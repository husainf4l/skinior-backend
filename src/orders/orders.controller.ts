import { Controller, Post, Get, Param, Body, Patch, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrderStatusenm } from '@prisma/client';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async createOrder(@Body() data: {
    cartId: number;
    paymentMethodId: number;
    shippingMethodId: number;
    addressId: number;
    userId?: string;
    guestInfoId?: number;
  }) {
    const order = await this.orderService.createOrderFromCart(data);
    if (!order) throw new NotFoundException('Order could not be created');
    return order;
  }

  @Get('user/:userId')
  async getAllOrders(@Param('userId') userId: string) {
    const orders = await this.orderService.findAllOrders(userId);
    if (!orders.length) throw new NotFoundException('No orders found for this user');
    return orders;
  }

  @Get('order/:id')
  async getOrderById(@Param('id') id: number) {
    return this.orderService.getOrderById(id);
  }

  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id') id: number,
    @Body() data: { status: OrderStatusenm }
  ) {
    const validStatuses = ['PENDING', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(data.status)) {
      throw new BadRequestException('Invalid order status');
    }
    return this.orderService.updateOrderStatus(id, data.status);
  }
}
