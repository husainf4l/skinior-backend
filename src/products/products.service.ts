import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany();
  }
  async featuredCategory(categoryId:number){
    return this.prisma.product.findMany({
      where:{
        categoryId,
        isFeatured:true
      }
    })
  }

  async categoryProducts(categoryId:number){
    return this.prisma.product.findMany({
      where:{categoryId}
    })
  }


  async findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id }, include:{items:true}});
  }

  async create(data: any) {
    return this.prisma.product.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.product.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
