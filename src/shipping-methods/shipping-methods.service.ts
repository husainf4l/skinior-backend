import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShippingMethodsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.shippingMethod.findMany();
  }

  async findOne(id: number) {
    return this.prisma.shippingMethod.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.shippingMethod.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.shippingMethod.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.shippingMethod.delete({ where: { id } });
  }
}
