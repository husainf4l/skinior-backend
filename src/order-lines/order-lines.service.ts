import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderLinesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.orderLine.findMany({ include: { item: true, order: true } });
  }

  async findOne(id: number) {
    return this.prisma.orderLine.findUnique({ where: { id }, include: { item: true, order: true } });
  }

  async create(data: any) {
    return this.prisma.orderLine.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.orderLine.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.orderLine.delete({ where: { id } });
  }
}
