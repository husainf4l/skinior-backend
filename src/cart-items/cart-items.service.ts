import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartItemsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.cartItem.findMany({ include: { item: true, cart: true } });
  }

  async findOne(id: number) {
    return this.prisma.cartItem.findUnique({ where: { id }, include: { item: true, cart: true } });
  }

  async create(data: any) {
    return this.prisma.cartItem.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.cartItem.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.cartItem.delete({ where: { id } });
  }
}
