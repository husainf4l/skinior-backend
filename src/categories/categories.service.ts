import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(handle: string) {
    return this.prisma.category.findUnique({ where: { handle } });
  }

  async create(data: any) {
    return this.prisma.category.create({ data });
  }

  async update(handle: string, data: any) {
    return this.prisma.category.update({ where: { handle }, data });
  }

  async delete(handle: string) {
    return this.prisma.category.delete({ where: { handle } });
  }
}
