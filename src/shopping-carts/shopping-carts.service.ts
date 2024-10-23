import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ShoppingCartsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.shoppingCart.findMany({ include: { items: true } });
  }

  async findOne(id: number) {
    return this.prisma.shoppingCart.findUnique({ where: { id }, include: { items: true } });
  }

  async create(data: Prisma.ShoppingCartCreateInput) {
    return this.prisma.shoppingCart.create({ data });
  }


  async update(id: number, data: Prisma.ShoppingCartUpdateInput) {
    return this.prisma.shoppingCart.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.shoppingCart.delete({ where: { id } });
  }
}
