import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartItemsService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
      return this.prisma.cartItem.findMany({  });
    }
  
    async findOne(id: number) {
      return this.prisma.cartItem.findUnique({ where: { id } });
    }
    async create(data: Prisma.CartItemUncheckedCreateInput) {
      const product = await this.prisma.product.findUnique({
        where: { id: data.productId },
      });
      if (!product) throw new NotFoundException('Product not found');
  
  
      return this.prisma.cartItem.create({
        data: {
          productId: data.productId,
          variantId: data.variantId,
          shoppingCartId: data.shoppingCartId,
          quantity: data.quantity,
          price: product.discountedPrice || product.price,
          total: data.price * data.quantity,
        },
      });
    }
  
    
    async update(id: number, data: Prisma.CartItemUpdateInput) {
      return this.prisma.cartItem.update({ where: { id }, data });
    }
  
    async delete(id: number) {
      return this.prisma.cartItem.delete({ where: { id } });
    }
  
}
