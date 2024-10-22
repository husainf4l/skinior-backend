import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserReviewsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.userReview.findMany({ include: { user: true, item: true } });
  }

  async findOne(id: number) {
    return this.prisma.userReview.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.userReview.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.userReview.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.userReview.delete({ where: { id } });
  }
}
