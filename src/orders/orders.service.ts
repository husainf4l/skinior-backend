import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.order.findMany({  });
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({ where: { id },  });
  }

  async create(data: any) {
    return this.prisma.order.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.order.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.order.delete({ where: { id } });
  }
}
